pub struct Message {
    pub role: String,
    pub content: String
}

pub struct ChatGptRequest {
    pub model: String,
    pub messages: Vec<Message>
}

pub struct Choice {
    pub finish_reason: String,
    pub index: usize,
    pub message: Message,
    pub logprobs: isize
}

pub struct Usage {
    pub completion_tokens: usize,
    pub prompt_tokens: usize,
    pub total_tokens: usize
}

pub struct ChatGptResponse {
    pub choices: Vec<Choice>,
    pub created: usize,
    pub id: String,
    pub model: String,
    pub object: String,
    pub usage: Usage
}