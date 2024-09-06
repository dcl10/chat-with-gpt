import { Button, TextInput } from "flowbite-react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChatRole } from "@/lib/enums";

export default function ChatInput({ onClick }: { onClick: Function }) {
  const [text, setText] = useState("");

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
        color={"blue"}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.code === "Enter" && validate(text)) {
            onClick({ content: text, role: ChatRole.User });
            setText("");
          }
        }}
      />
      <Button
        type="button"
        onClick={() => {
          if (validate(text)) {
            onClick({ content: text, role: ChatRole.User });
            setText("");
          }
        }}
        className="items-center absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-neutral-200 text-black hover:text-white"
        color={"dark"}
        disabled={!validate(text)}
      >
        <ArrowUpIcon className="size-4 rounded-full" />
      </Button>
    </div>
  );
}
