use candid::CandidType;
use rusqlite::Connection;
use serde::Deserialize;

use crate::modules::db::db::create_change_triggers;

#[derive(CandidType, Deserialize)]
pub struct ChatInput {
    pub message: String,
}

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
}
