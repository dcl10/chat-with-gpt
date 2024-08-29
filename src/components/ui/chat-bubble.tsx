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
    <div className={`${position} flex`}>
      <div className={`${bgColor} ${position} max-w-screen-sm`}>
        <p className="dark:text-white">{text}</p>
      </div>
    </div>
  );
}
