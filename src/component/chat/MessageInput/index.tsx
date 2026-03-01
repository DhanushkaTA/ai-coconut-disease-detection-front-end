import { useEffect, useState } from "react";
import { Input, Button } from "@fluentui/react-components";
import { SendRegular } from "@fluentui/react-icons";
import { socket } from "../../../socket/chatSocket";
import { useAuth } from "../../../hook/useAuth";
import { useAppDispatch } from "../../../hook/dispatchHook";
import { messageApi } from "../../../service/messageApi";
import { v4 as uuidv4 } from 'uuid';
import { chatApi } from "../../../service/chatApi";

const MessageInput = ({ chatId, receiverId }:any) => {
  const [text, setText] = useState("");

  const user = useAuth();
  const currentUserId = user?.id;
  
    const dispatch = useAppDispatch();

  const sendMessage = () => {
  if (!text.trim()) return;

  const tempId = uuidv4();
  const now = new Date().toISOString();

  const optimisticMessage = {
    _id: tempId,
    chatId,
    senderId: currentUserId,
    receiverId,
    text,
    image: null,
    isRead: false,
    createdAt: now,
    status: "sending",
  };

  // ✅ Update messages cache
  dispatch(
    messageApi.util.updateQueryData(
      "getMessages",
      chatId,
      (draft: any[]) => {
        draft.push(optimisticMessage);
      }
    )
  );

  // ✅ Update chat sidebar cache (THIS IS NEW)
  dispatch(
    chatApi.util.updateQueryData(
      "getChats",
      undefined,
      (draft: any[]) => {
        const chat = draft.find((c) => c._id === chatId);
        if (!chat) return;

        chat.lastMessage = {
          content: text,
          createdAt: now,
          senderId: currentUserId,
        };

        chat.updatedAt = now;
      }
    )
  );

  // ✅ Emit to backend
  socket.emit("send_message", {
    receiverId,
    content: text,
    image: null,
    clientTempId: tempId,
  });

  setText("");
};

  useEffect(() => {

    socket.on("receive_message", (newMessage) => {
      console.log("New message:", newMessage);
    });

    return () => {
      socket.off("receive_message");
    };

  }, []);

  return (
    <div className="p-3 border-t flex gap-2 bg-[#133313]">
      <Input
        className="flex-1 "
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />

      <Button
        appearance="primary"
        className="bg-green-700!"
        icon={<SendRegular />}
        onClick={sendMessage}
      />
    </div>
  );
};

export default MessageInput;