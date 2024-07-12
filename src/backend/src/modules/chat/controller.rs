use ic_cdk::update;

use crate::{modules::change::Change, DB};

use super::ChatInput;

#[update]
fn message_create(chat: ChatInput, changes_from_id: u64) -> Result<Vec<Change>, String> {
    DB.with(|db| {
        let mut db = db.borrow_mut();
        let db = db.as_mut().unwrap();
        db.prepare("INSERT INTO chat (message) VALUES (?1)")
            .unwrap()
            .execute([&chat.message])
            .unwrap();
        Ok(crate::modules::change::get(changes_from_id, db))
    })
}
