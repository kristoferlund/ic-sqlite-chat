use ic_cdk::query;

use crate::{Change, DB};

use super::change;

#[query]
fn changes_get(from_id: u64) -> Vec<Change> {
    DB.with_borrow_mut(|db| {
        let db = db.as_mut().unwrap();
        change::get(from_id, db)
    })
}
