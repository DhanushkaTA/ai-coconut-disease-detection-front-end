import { Button } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useGetChatsQuery } from "../../../service/chatApi";
import ChatListItem from "../ChatListItem/index";
import NewChatDialog from "../NewChatDialog/index";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

import { socket } from "../../../socket/chatSocket";
import { useAppDispatch } from "../../../hook/dispatchHook";
import { chatApi } from "../../../service/chatApi";

const ChatSidebar = ({ onSelectChat }: any) => {
  const { data: chats = [] } = useGetChatsQuery();
  const [open, setOpen] = useState(false);

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  const currentUserEmail = useSelector(
    (state: RootState) => state.auth.user?.email,
  );

  const dispatch = useAppDispatch();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Chats
          {/* - {currentUserId} - {currentUserEmail} */}
        </h2>

        <Button
          icon={<AddRegular />}
          appearance="primary"
          onClick={() => setOpen(true)}
        >
          New
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat: any) => {
          const otherUser = chat.participants.find(
            (p: any) => p._id !== currentUserId,
          );

          return (
            <ChatListItem
              key={chat._id}
              chat={chat}
              currentUserId={currentUserId}
              onClick={() => {
                onSelectChat({
                  chatId: chat._id,
                  receiverId: otherUser?._id,
                });

                // ✅ Reset unread count instantly
                dispatch(
                  chatApi.util.updateQueryData(
                    "getChats",
                    undefined,
                    (draft: any[]) => {
                      const found = draft.find((c) => c._id === chat._id);
                      if (found) {
                        found.unreadCount = 0;
                      }
                    },
                  ),
                );

                // ✅ Optional: tell backend to mark as read
                socket.emit("mark_read", {
                  chatId: chat._id,
                });
              }}
            />
          );
        })}
      </div>

      <NewChatDialog
        open={open}
        onClose={() => setOpen(false)}
        onSelectUser={(chat, receiverId) => {
          // Add chat to sidebar cache if not exists
          dispatch(
            chatApi.util.updateQueryData(
              "getChats",
              undefined,
              (draft: any[]) => {
                const exists = draft.find((c) => c._id === chat._id);

                if (!exists) {
                  draft.unshift(chat);
                }
              },
            ),
          );

          // Open chat
          onSelectChat({
            chatId: chat._id,
            receiverId,
          });
        }}
      />
    </div>
  );
};

export default ChatSidebar;
