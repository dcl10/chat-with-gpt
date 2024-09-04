import { Button, TextInput } from 'flowbite-react';
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useRef } from 'react';
import { ChatRole } from '@/lib/enums';

export default function ChatInput({onClick}:{onClick: Function}) {
    const ref = useRef("")
    return (
        <div className="relative w-full max-w-md">
          <TextInput
            id="chat-input"
            type="text"
            placeholder="Type a message..."
            className="rounded-full"
            sizing={"md"}
            onChange={(event) => ref.current = event.target.value}
          />
          <Button
            type="button"
            onClick={() => onClick({content: ref.current, role: ChatRole.User})}
            className="items-center absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-neutral-200 text-black hover:text-white"
            color={"dark"}
          >
            <ArrowUpIcon className="size-4 rounded-full" />
          </Button>
        </div>
      );
}