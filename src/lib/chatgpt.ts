import OpenAI from "openai"
import { getSettings } from "./utils"

const settings = await getSettings()

const client = new OpenAI({ apiKey: settings.apiKey });

export async function sendMessage(messages: Array<OpenAI.Chat.ChatCompletionMessageParam>): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const completion = await client.chat.completions.create({
        model: settings.model,
        messages: messages
    });
    return completion;
}