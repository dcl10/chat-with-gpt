pub struct Message {
    pub role: String,
    pub content: String
}

pub struct ChatGptRequest {
    pub model: String,
    pub messages: Vec<Message>
}