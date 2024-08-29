"use client";

import ChatInput from "@/components/ui/chat-input";
import BackButton from "@/components/ui/back-button";

export default function ChatPage() {
  return (
    <div className="sm:p-5 lg:p-20 space-y-2 flex flex-col">
      <BackButton onClick={() => (window.location.href = "/")} />
      <div className="flex flex-col items-center justify-center fixed bottom-4 inset-x-2">
        <ChatInput onClick={() => console.log("clicked")} />
      </div>
    </div>
  );
}
