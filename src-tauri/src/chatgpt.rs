use crate::{
    constants::CHAT_COMPLETIONS_ENDPOINT,
    errors::ChatCompletionError,
    models::{ChatGptRequest, ChatGptResponse},
    settings::AppSettings,
};
use reqwest::Error as ReqwestError;
use std::sync::Mutex;
use tauri::State;

#[tauri::command]
pub async fn chat_to_model(
    state: State<'_, Mutex<AppSettings>>,
    request: ChatGptRequest,
) -> Result<ChatGptResponse, String> {
    let api_key = state.lock().unwrap().api_key.clone();
    let completions_result = request_completions(api_key, &request).await;
    if completions_result.is_err() {
        return Err("Could not get chat completions".to_string());
    }
    let completions_response = completions_result.unwrap();
    let deserialisation_result = deserialise_result(completions_response.as_str());

    match deserialisation_result {
        Ok(response) => Ok(response),
        Err(error) => Err(error.error.message),
    }
}

async fn request_completions(
    api_key: String,
    request: &ChatGptRequest,
) -> Result<String, ReqwestError> {
    let client = reqwest::Client::new();
    let res = client
        .post(CHAT_COMPLETIONS_ENDPOINT)
        .bearer_auth(api_key)
        .header("Content-Type", "application/json")
        .body(serde_json::to_string(request).unwrap())
        .send()
        .await;

    match res {
        Ok(x) => x.text().await,
        Err(y) => Err(y),
    }
}

fn deserialise_result(result: &str) -> Result<ChatGptResponse, ChatCompletionError> {
    // The correct response came back
    let success = serde_json::from_str::<ChatGptResponse>(result);
    if success.is_ok() {
        return Ok(success.unwrap());
    }

    // An error response comes back from the API
    let error = serde_json::from_str::<ChatCompletionError>(result);
    Err(error.unwrap())
}
