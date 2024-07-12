use rusqlite::Connection;

use crate::Change;

pub fn init_db(db: &mut Connection) {
    db.execute(
        "CREATE TABLE changes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_name TEXT NOT NULL,
            operation TEXT NOT NULL,
            row_id INTEGER NOT NULL,
            changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            old_values TEXT,
            new_values TEXT
        )",
        (),
    )
    .unwrap();
}

pub fn get(from_id: u64, db: &mut Connection) -> Vec<Change> {
    let mut stmt = db
        .prepare("SELECT id, table_name, operation, row_id, new_values FROM changes WHERE id > ?1")
        .unwrap();
    let rows = stmt
        .query_map([&from_id], |row| {
            Ok((
                row.get(0).unwrap(),
                row.get(1).unwrap(),
                row.get(2).unwrap(),
                row.get(3).unwrap(),
                row.get(4).unwrap(),
            ))
        })
        .unwrap();
    let mut result = vec![];
    for change in rows {
        result.push(change.unwrap());
    }
    result
}
