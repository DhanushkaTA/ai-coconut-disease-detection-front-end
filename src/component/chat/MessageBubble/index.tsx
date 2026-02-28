import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const MessageBubble = ({ message }: any) => {
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  const isMine = message.senderId === currentUserId;

  return (
    <div
      className={`
        max-w-xs px-4 py-2 mb-2 rounded-lg
        ${isMine ? "bg-[#1e471f] text-white ml-auto" : "bg-white border"}
      `}
    >
      {message.image && (
        <img src={message.image} className="rounded mb-2 max-h-60" />
      )}

      {message.content}

      {isMine && (
        <div className="text-xs text-right">
          {message.status === "sending" ? "⏳" : message.isRead ? "✓✓" : "✓"}
        </div>
      )}

      {/* {message.senderId === currentUserId && (
        <span className="text-xs ml-2">
          {message.status === "sending" ? "⏳" : "✓"}
        </span>
      )} */}
    </div>
  );
};

export default MessageBubble;
