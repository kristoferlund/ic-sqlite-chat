use candid::CandidType;
use serde::Deserialize;

#[derive(CandidType, Deserialize)]
pub struct ChatInput {
    pub message: String,
}
