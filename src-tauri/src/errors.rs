use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChatCompletionError {
    pub error: APIError,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct APIError {
    pub message: String,
    #[serde(rename = "type")]
    pub type_: String,
    pub param: Option<String>,
    pub code: Option<String>,
}
