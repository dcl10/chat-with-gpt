import { Button, TextInput } from 'flowbite-react';
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function ChatInput({onClick}:{onClick: () => void}) {
    return (
        <div className="relative w-full max-w-md">
          <TextInput
            id="chat-input"
            type="text"
            placeholder="Type a message..."
            className="rounded-full"
            sizing={"md"}
            color={"dark"}
          />
          <Button
            type="button"
            onClick={onClick}
            className="items-center absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-neutral-200 text-black hover:text-white"
            color={"dark"}
          >
            <ArrowUpIcon className="size-4 rounded-full" />
          </Button>
        </div>
      );
}