import { Avatar, Badge } from "@fluentui/react-components";

const ChatListItem = ({ chat, onClick, currentUserId }: any) => {
  const otherUser = chat.participants.find((p: any) => p._id !== currentUserId);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
    >
      <Avatar
        name={otherUser.firstName}
        image={{ src: otherUser.profilePic }}
      />

      <div className="ml-3 flex-1">
        <p className="font-medium">
          {otherUser.firstName} {otherUser.lastName}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {/* {chat.lastMessage?.content || "No messages yet"} */}
          {truncateText(chat.lastMessage?.content || "No messages yet", 60)}
        </p>
      </div>

      {chat.unreadCount > 0 && (
        <Badge appearance="filled" className="bg-red-500!">
          {chat.unreadCount}
        </Badge>
      )}
      {/* {chat.unreadCount > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {chat.unreadCount}
        </span>
      )} */}
    </div>
  );
};

export default ChatListItem;
