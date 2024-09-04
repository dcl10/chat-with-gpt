"use client";

import ChatInput from "@/components/ui/chat-input";
import BackButton from "@/components/ui/back-button";
import ChatBubble from "@/components/ui/chat-bubble";
import { ChatGptResponse, Message } from "@/lib/types";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { ChatRole } from "@/lib/enums";

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  async function addToHistory(message: Message) {
    let messages: Message[] = [message];
    try {
      let response: ChatGptResponse = await invoke("chat_to_model", {
        request: {
          model: "gpt-4o-mini",
          messages: [{ role: message.role, content: message.content }],
        },
      })
      response.choices.map(choice => messages.push(choice.message));
      setChatHistory([...chatHistory, ...messages])
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="sm:p-5 lg:p-20 space-y-4 justify-center">
      <BackButton onClick={() => (window.location.href = "/")} />
      {chatHistory.map((message: Message, key) => (
        <ChatBubble key={key} text={message.content} isUser={message.role === ChatRole.User} />
      ))}
      <div className="flex items-center justify-center fixed bottom-4 inset-x-2">
        <ChatInput onClick={addToHistory} />
      </div>
    </div>
  );
}
