import { ChatRole } from "./enums";

export type AppSettings = {
    apiKey: string;
    model: string;
};

export type Choice = {
    finish_reason: string;
    index: number;
    message: Message;
    logprobs: number | null;
}

export type Message = {
    role: ChatRole;
    content: string;
}

export type Usage = {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
}

export type ChatGptResponse = {
    choices: Choice[];
    created: number;
    id: string;
    model: string;
    object: string;
    usage: Usage;
}