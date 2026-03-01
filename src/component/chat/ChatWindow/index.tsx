import { useEffect, useRef } from "react";
import { useGetMessagesQuery } from "../../../service/messageApi";
import { socket } from "../../../socket/chatSocket";
import MessageBubble from "../MessageBubble/index";
import MessageInput from "../MessageInput/index";
import { useAuth } from "../../../hook/useAuth";

// import { useDispatch } from "react-redux";
import { messageApi } from "../../../service/messageApi";
import { useAppDispatch } from "../../../hook/dispatchHook";

import background from "../../../assets/chat_bg_1.jpg";

const ChatWindow = ({ chatId, receiverId, onBack }: any) => {
  const { data: messages = [] } = useGetMessagesQuery(chatId);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // get curecnt user info from auth state
  const user = useAuth();
  const currentUserId = user?.id;

  const dispatch = useAppDispatch();

  console.log(messages);

  useEffect(() => {
    if (chatId) {
      socket.emit("register_room", { chatId });

      socket.emit("mark_read", { chatId });
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      socket.emit("mark_read", { chatId });
    }
  }, [messages]);

  // useEffect(() => {
  //   socket.on("receive_message", (newMessage) => {
  //     console.log("New message:", newMessage);

  //     // optionally update state here
  //   });

  //   return () => {
  //     socket.off("receive_message");
  //   };
  // }, []);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      console.log("New message:", newMessage);

      // Only update if message belongs to this chat
      if (newMessage.chatId !== chatId) return;

      dispatch(
        messageApi.util.updateQueryData(
          "getMessages",
          chatId,
          (draft: any[]) => {
            // // 🔎 Check if optimistic message exists
            // const index = draft.findIndex(
            //   (msg) =>
            //     msg.status === "sending" &&
            //     msg.content === newMessage.content &&
            //     msg.senderId === newMessage.senderId
            // );

            // if (index !== -1) {
            //   // ✅ Replace optimistic with real message
            //   draft[index] = {
            //     ...newMessage,
            //     status: "sent",
            //   };
            // } else {
            //   // ✅ Normal case (receiver side)
            //   draft.push(newMessage);
            // }

            // sort to top when new message send
            // 🔥 Update sidebar instantly
            // const chat = draft.find((c) => c._id === chatId);

            // if (!chat) return;

            // chat.lastMessage = {
            //   content: newMessage.content,
            //   createdAt: new Date().toISOString(),
            // };

            // chat.updatedAt = new Date().toISOString();

            // sort to top when new message receive
            // 🔥 Find optimistic by clientTempId
            const index = draft.findIndex(
              (msg) => msg._id === newMessage.clientTempId,
            );

            if (index !== -1) {
              draft[index] = newMessage; // replace
            } else {
              draft.push(newMessage); // receiver case
            }
          },
        ),
      );
    });

    return () => {
      socket.off("receive_message");
    };
  }, [chatId, dispatch]);

  useEffect(() => {
    socket.on("messages_read", ({ chatId: readChatId, readerId }) => {
      if (readChatId !== chatId) return;

      dispatch(
        messageApi.util.updateQueryData(
          "getMessages",
          chatId,
          (draft: any[]) => {
            draft.forEach((msg) => {
              // Only mark messages that were sent TO reader
              if (
                msg.senderId === currentUserId &&
                msg.receiverId === readerId &&
                msg.isRead === false
              ) {
                msg.isRead = true;
              }
            });
          },
        ),
      );
    });

    return () => {
      socket.off("messages_read");
    };
  }, [chatId, dispatch, currentUserId]);

  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatId]);

  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const isNearBottom = () => {
    if (!scrollRef.current) return false;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    return scrollHeight - scrollTop - clientHeight < 100;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center">
        <button className="md:hidden mr-3" onClick={onBack}>
          ←
        </button>
        <h2 className="font-semibold">Chat</h2>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        {messages?.map((msg: any) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </div>

      <MessageInput chatId={chatId} receiverId={receiverId} />
    </div>
  );
};

export default ChatWindow;
