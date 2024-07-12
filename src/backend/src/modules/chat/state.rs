use rusqlite::Connection;

use crate::modules::db::create_change_triggers;

pub fn init_db(db: &mut Connection) {
    db.execute(
        "CREATE TABLE chat (
            id INTEGER PRIMARY KEY,
            message TEXT NOT NULL
        )",
        (),
    )
    .unwrap();

    create_change_triggers(db, "chat", &["message"]);

    db.prepare("INSERT INTO chat (message) VALUES (?1)")
        .unwrap()
        .execute([&"Hello, world!"])
        .unwrap();
}
