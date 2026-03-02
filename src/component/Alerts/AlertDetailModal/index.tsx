import {
  useGetAlertByIdQuery,
  useGetCommentsByIdQuery,
  useAddCommentMutation,
  useToggleLikeMutation,
} from "../../../service/alertApi";

import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogContent,
} from "@fluentui/react-components";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
interface Props {
  alertId: string | null;
  open: boolean;
  onClose: () => void;
}

const AlertDetailModal = ({ alertId, open, onClose }: Props) => {
  const { data } = useGetAlertByIdQuery({ id: alertId! }, { skip: !alertId });

  const [page, setPage] = useState(1);
  const [allComments, setAllComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data: commentData, isFetching } = useGetCommentsByIdQuery(
    { id: alertId ?? "", page },
    { skip: !alertId },
  );

  const [addComment] = useAddCommentMutation();
  const [toggleLike] = useToggleLikeMutation();

  const [commentText, setCommentText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset when alert changes
  useEffect(() => {
    setPage(1);
    setAllComments([]);
    setHasMore(true);
  }, [alertId]);

  // Append comments
  useEffect(() => {
    if (commentData?.data?.comments) {
      const newComments = commentData.data.comments;

      setAllComments((prev) => [...prev, ...newComments]);

      console.log("New comments loaded:", newComments);

      if (newComments.length < 10) {
        setHasMore(false);
      }
    }
  }, [commentData]);

  // Infinite scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !hasMore || isFetching) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 30) {
      setPage((prev) => prev + 1);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    await addComment({
      id: alertId,
      content: commentText,
    });

    setCommentText("");
    setPage(0);
    setAllComments([]);
    setHasMore(true);

    // let data = await useGetAlertByIdQuery(
    //   { id: alertId, page: page },
    //   { skip: !alertId, refetchOnMountOrArgChange: true },
    // );
    // console.log("Data after adding comment:", data);
    // setAllComments(data?.data?.comments || []);
  };

  //   const handleAddComment = async () => {
  //     if (!commentText.trim()) return;

  //     await addComment({
  //       id: alertId,
  //       content: commentText,
  //     });

  //     setCommentText("");
  //   };

  const close = () => {
    onClose();

  }

  if (!data) return null;
  const alert = data;

  return (
    <Dialog open={open}>
      <DialogSurface className="w-full md:max-w-3xl max-h-[95vh] rounded-xl">
        <DialogBody className="flex! flex-col! p-0!">
          <div
            onClick={close}
            className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
          >
            X
          </div>
          {/* Image */}
          {alert.image && (
            <img
              src={alert.image}
              className="w-full h-60 md:h-80 object-cover rounded-lg mb-4"
            />
          )}

          <DialogContent className="space-y-4">
            <h2 className="text-xl font-bold">{alert.title}</h2>

            <p className="text-gray-600">{alert.description}</p>

            <div className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(alert.createdAt), {
                addSuffix: true,
              })}
            </div>

            {/* Like & Comment count */}
            <div className="flex gap-6 text-sm pt-2 border-t">
              <button
                onClick={() => toggleLike(alert._id)}
                className="hover:text-red-500 transition"
              >
                ❤️ {alert.likeCount}
              </button>

              <span>💬 {alert.commentCount}</span>
            </div>

            {/* Comments Section */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-[350px] overflow-y-auto border-t pt-4 pr-2 space-y-4"
            >
              {allComments.map((c) => (
                <div key={c._id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <img
                      src={c.userId.profilePic}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    {c.userId.firstName} {c.userId.lastName}
                  </div>

                  <div className="text-sm text-gray-600 mt-1">{c.content}</div>
                </div>
              ))}

              {isFetching && (
                <p className="text-center text-sm text-gray-500">
                  Loading more comments...
                </p>
              )}

              {!hasMore && (
                <p className="text-center text-xs text-gray-400">
                  No more comments
                </p>
              )}
            </div>

            {/* Add Comment */}
            <div className="flex gap-2 pt-3 border-t">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border rounded-lg px-3 py-2"
              />

              <button
                onClick={handleAddComment}
                className="bg-green-600 text-white px-4 rounded-lg"
              >
                Send
              </button>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default AlertDetailModal;
