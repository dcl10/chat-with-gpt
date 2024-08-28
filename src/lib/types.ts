export type AppSettings = {
    apiKey?: string;
};

export type ChatGPTMessage = {
    role: string;
    message: string;
}

export type Choice = {
    finish_reason: string;
    index: number;
    message: ChatGPTMessage;
    logprobs?: any;
}

export type Usage = {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
}

export type ChatGPTResponse = {
    choices: Array<Choice>;
    created: number;
    id: string;
    model: string;
    object: string;
    usage: Usage;
}