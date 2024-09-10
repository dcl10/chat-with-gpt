import Markdown from "react-markdown";

export default function ChatBubble({
  text,
  isUser,
}: {
  text: string;
  isUser: boolean;
}) {
  const bgColor = isUser ? "bg-blue-400" : "bg-gray-400";
  const position = isUser ? "ml-auto" : "mr-auto";

  return (
    <div className="flex">
      <div className={`${bgColor} ${position} max-w-screen-sm rounded-lg`}>
        <Markdown className={"dark:text-white light:text-black px-4 py-0.5"}>{text}</Markdown>
      </div>
    </div>
  );
}
