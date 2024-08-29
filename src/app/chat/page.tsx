"use client";

import ChatInput from "@/components/ui/chat-input";
import BackButton from "@/components/ui/back-button";
import ChatBubble from "@/components/ui/chat-bubble";
import { TextAndRole } from "@/lib/types";
import { useState } from "react";

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<TextAndRole[]>([]);

  function addToHistory(text: string, isUser: boolean) {
    setChatHistory([...chatHistory, { text, isUser }]);
  }

  return (
    <div className="sm:p-5 lg:p-20 space-y-4 justify-center">
      <BackButton onClick={() => (window.location.href = "/")} />
      {chatHistory.map((textAndRole: TextAndRole) => (
        <ChatBubble text={textAndRole.text} isUser={textAndRole.isUser} />
      ))}
      <div className="flex items-center justify-center fixed bottom-4 inset-x-2">
        <ChatInput
          onClick={addToHistory}
        />
      </div>
    </div>
  );
}
