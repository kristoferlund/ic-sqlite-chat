use ic_cdk::query;

use crate::{DB_FILE, ROOT_DIR};

#[query]
fn db_get() -> Vec<u8> {
    std::fs::read(format!("{}/{}", ROOT_DIR, DB_FILE)).unwrap()
}
