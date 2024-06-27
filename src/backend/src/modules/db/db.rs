use rusqlite::Connection;

pub fn create_change_triggers(db: &mut Connection, table_name: &str, columns: &[&str]) {
    let new_values_list = columns
        .iter()
        .map(|&col| format!("'{}', NEW.{}", col, col))
        .collect::<Vec<_>>()
        .join(", ");

    let old_values_list = columns
        .iter()
        .map(|&col| format!("'{}', OLD.{}", col, col))
        .collect::<Vec<_>>()
        .join(", ");

    let insert_trigger = format!(
        "CREATE TRIGGER IF NOT EXISTS log_insert_{0} AFTER INSERT ON {0}
        BEGIN
            INSERT INTO changes (table_name, operation, row_id, new_values)
            VALUES ('{0}', 'INSERT', NEW.id, json_object({1}));
        END;",
        table_name, new_values_list
    );

    let update_trigger = format!(
        "CREATE TRIGGER IF NOT EXISTS log_update_{0} AFTER UPDATE ON {0}
        BEGIN
            INSERT INTO changes (table_name, operation, row_id, old_values, new_values)
            VALUES ('{0}', 'UPDATE', OLD.id, json_object({1}), json_object({2}));
        END;",
        table_name, old_values_list, new_values_list
    );

    let delete_trigger = format!(
        "CREATE TRIGGER IF NOT EXISTS log_delete_{0} AFTER DELETE ON {0}
        BEGIN
            INSERT INTO changes (table_name, operation, row_id, old_values)
            VALUES ('{0}', 'DELETE', OLD.id, json_object({1}));
        END;",
        table_name, old_values_list
    );

    db.execute(&insert_trigger, ()).unwrap();
    db.execute(&update_trigger, ()).unwrap();
    db.execute(&delete_trigger, ()).unwrap();
}
