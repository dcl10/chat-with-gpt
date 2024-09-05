"use client";

import ChatInput from "@/components/ui/chat-input";
import TitleBar from "@/components/ui/title-bar";
import ChatBubble from "@/components/ui/chat-bubble";
import { ChatGptResponse, Message } from "@/lib/types";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { ChatRole } from "@/lib/enums";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const router = useRouter();

  function goBack() {
    router.back();
  }

  async function addToHistory(message: Message) {
    setChatHistory((prev) => [...prev, message]);
    try {
      let response: ChatGptResponse = await invoke("chat_to_model", {
        request: {
          model: "gpt-4o-mini",
          messages: [{ role: message.role, content: message.content }],
        },
      });
      let messages: Message[] = [];
      response.choices.map((choice) => messages.push(choice.message));
      setChatHistory((prev) => [...prev, ...messages]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative">
      <TitleBar title="Chat"/>
      <div className="pt-20"></div>
      <div className="sm:p-5 lg:p-20 space-y-4 justify-center">
        {chatHistory.map((message: Message, key) => (
          <ChatBubble
            key={key}
            text={message.content}
            isUser={message.role === ChatRole.User}
          />
        ))}
        <div className="pb-10"></div>
        <div className="flex items-center justify-center fixed bottom-4 inset-x-2">
          <ChatInput onClick={addToHistory} />
        </div>
      </div>
    </div>
  );
}
