use ic_cdk::query;

use crate::DB_FILE;

#[query]
fn db_get() -> Vec<u8> {
    std::fs::read(DB_FILE).unwrap()
}
