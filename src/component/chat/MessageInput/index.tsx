import { useEffect, useState } from "react";
import { Input, Button } from "@fluentui/react-components";
import { SendRegular } from "@fluentui/react-icons";
import { socket } from "../../../socket/chatSocket";
import { useAuth } from "../../../hook/useAuth";
import { useAppDispatch } from "../../../hook/dispatchHook";
import { messageApi } from "../../../service/messageApi";
import { v4 as uuidv4 } from 'uuid';

const MessageInput = ({ chatId, receiverId }:any) => {
  const [text, setText] = useState("");

  const user = useAuth();
  const currentUserId = user?.id;
  
    const dispatch = useAppDispatch();

  const sendMessage = () => {
    if (!text) return;

    // socket.emit("send_message", {
    //   chatId,
    //   content: text,
    // });

    if (!text.trim()) return;

    const tempId = uuidv4();

    const optimisticMessage = {
      _id: tempId,          // fake id
      chatId,
      senderId: currentUserId,
      receiverId,
      text,
      image: null,
      isRead: false,
      createdAt: new Date().toISOString(),
      status: "sending",    // 👈 custom field
    };

    // ✅ 1. Immediately insert into cache
    dispatch(
      messageApi.util.updateQueryData(
        "getMessages",
        chatId,
        (draft: any[]) => {
          draft.push(optimisticMessage);
        }
      )
    );

    // ✅ 2. Emit to backend
    socket.emit("send_message", {
      receiverId,
      content:text,
      image:null,
      clientTempId: tempId, // 👈 send tempId to backend
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