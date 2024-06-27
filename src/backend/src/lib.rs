pub mod modules;

use ic_cdk::{export_candid, init, post_upgrade};
use rusqlite::Connection;
use std::cell::RefCell;

pub use modules::change::Change;
pub use modules::chat::ChatInput;

pub const ROOT_DIR: &str = "root";
pub const DB_FILE: &str = "db.sqlite";

thread_local! {
    pub static DB: RefCell<Option<Connection>> = const { RefCell::new(None) };
}

#[init]
fn init() {
    ic_wasi_polyfill::init(&[0u8; 32], &[]);

    std::fs::create_dir_all(ROOT_DIR).unwrap();

    DB.with_borrow_mut(|db| {
        *db = Some(Connection::open(format!("{}/{}", ROOT_DIR, DB_FILE)).unwrap());
        let db = db.as_mut().unwrap();

        modules::change::init_db(db);
        modules::chat::init_db(db);
    });
}

#[post_upgrade]
fn post_upgrade() {
    ic_wasi_polyfill::init(&[0u8; 32], &[]);

    DB.with_borrow_mut(|db| {
        *db = Some(Connection::open(format!("{}/{}", ROOT_DIR, DB_FILE)).unwrap());
    });
}

export_candid!();
