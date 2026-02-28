import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  Input,
} from "@fluentui/react-components";
import { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../../service/userApi";
import { useCreateChatMutation } from "../../../service/chatApi";
import type { PostUser } from "../../../utils/Types";
// import { useCreateChatMutation } from "../../../service/chatApi";

const NewChatDialog = ({ open, onClose, onSelectUser }: any) => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetUsersQuery({
    page: 1,
    limit: 100,
    search,
    role: "",
  });
  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // setDebouncedSearch(search);
      // setPage(1); // reset page on new search
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSelectUser = async (user: PostUser) => {
    const chat = await createChat({
      receiverId: user._id,
    }).unwrap();

    onSelectUser(chat, user._id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => !data.open && onClose()}>
      <DialogSurface>
        <DialogTitle>Start New Chat</DialogTitle>
        <DialogBody className="mt-5! flex! flex-col! gap-4!">
          <Input
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Render searched users here */}
          {/* <div>
            <div className="p-2 cursor-pointer hover:bg-gray-100 rounded">
              John Doe
            </div>
          </div> */}
          <div>
            {data?.data?.map((user: PostUser) => (
              <div
                key={user._id}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => handleSelectUser(user)}
              >
                {user.firstName} {user.lastName} ({user.username})
              </div>
            ))}
          </div>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default NewChatDialog;
