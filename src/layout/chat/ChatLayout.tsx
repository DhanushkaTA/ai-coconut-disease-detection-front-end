import { useState } from "react";
import ChatSidebar from "../../component/chat/ChatSidebar/index";
import ChatWindow from "../../component/chat/ChatWindow/index";

import { useEffect } from "react";
import { socket } from "../../socket/chatSocket";
import { useAppDispatch } from "../../hook/dispatchHook";
import { chatApi } from "../../service/chatApi";

interface SelectedChat {
  chatId: string;
  receiverId: string;
}

const ChatLayout = () => {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("receive_message_notification", (message) => {
      console.log("🔔 New notification:", message);
      alert(`New message from ${message.senderName}: ${message.content}`);

      dispatch(
        chatApi.util.updateQueryData("getChats", undefined, (draft: any[]) => {
          const chat = draft.find((c) => c._id === message.chatId);

          if (!chat) return;

          // ✅ Update last message
          chat.lastMessage = message;

          // ✅ Update updatedAt so sorting works
          chat.updatedAt = message.createdAt;

          // ✅ Increase unread ONLY if this chat is NOT open
          if (selectedChat?.chatId !== message.chatId) {
            chat.unreadCount = (chat.unreadCount || 0) + 1;
          }

          // ✅ Move chat to top
          draft.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          );
        }),
      );
    });

    return () => {
      socket.off("receive_message_notification");
    };
  }, [dispatch, selectedChat]);

  return (
    <div className="h-[99%] flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          w-full md:w-1/3 bg-white border-r
          ${selectedChat ? "hidden md:block" : "block"}
        `}
      >
        <ChatSidebar onSelectChat={setSelectedChat} />
      </div>

      {/* Chat Window */}
      <div
        className={`
          flex-1
          ${selectedChat ? "block" : "hidden md:block"}
        `}
      >
        {selectedChat && (
          <ChatWindow
            chatId={selectedChat.chatId}
            receiverId={selectedChat.receiverId}
            onBack={() => setSelectedChat(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
