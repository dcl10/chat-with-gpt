import { Button, TextInput } from "flowbite-react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChatRole } from "@/lib/enums";

export default function ChatInput({ onClick }: { onClick: Function }) {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  function validate(input: string): boolean {
    return input.length > 0;
  }

  return (
    <div className="relative w-full max-w-md">
      <TextInput
        id="chat-input"
        type="text"
        placeholder="Type a message..."
        className="rounded-full"
        sizing={"md"}
        color={"gray"}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={async (event) => {
          if (event.code === "Enter" && validate(text)) {
            setText("");
            setIsProcessing((prev) => !prev);
            await onClick({ content: text, role: ChatRole.User });
            setIsProcessing((prev) => !prev);
          }
        }}
      />
      <Button
        type="button"
        onClick={async () => {
          if (validate(text)) {
            setText("");
            setIsProcessing((prev) => !prev);
            await onClick({ content: text, role: ChatRole.User });
            setIsProcessing((prev) => !prev);
          }
        }}
        className="items-center absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full text-white"
        color={"blue"}
        disabled={!validate(text)}
        isProcessing={isProcessing}
      >
        <ArrowUpIcon className="size-4 rounded-full" />
      </Button>
    </div>
  );
}
