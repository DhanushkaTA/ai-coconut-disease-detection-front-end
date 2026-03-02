import { useState } from "react";
import CommentItem from "../commentItem";
import {
  useCreatePostCommentMutation,
  useGetPostByIdQuery,
} from "../../service/postApi";
import { Button, Input } from "@fluentui/react-components";
import { SendRegular } from "@fluentui/react-icons";
import { useAuth } from "../../hook/useAuth";

interface Props {
  postId: string | null;
  open: boolean;
  onClose: () => void;
}

const PostCommentsDrawer = ({ postId, open, onClose }: Props) => {
  const [page, setPage] = useState(1);
  const [allComments, setAllComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [expanded, setExpanded] = useState(false);

  const [text, setText] = useState("");

  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [selectedCommentContent, setSelectedCommentContent] = useState<
    string | null
  >(null);

  // const { data: commentData, isFetching } = useGetPostCommentsQuery(
  //   { postId: postId!, page },
  //   { skip: !postId },
  // );

  const { data, isLoading } = useGetPostByIdQuery(postId!, {
    skip: !postId,
  });

  const [createPostComment, { isLoading: isSending }] =
    useCreatePostCommentMutation();

  const user = useAuth();
  const currentUserId = user?.id;

  if (!open) return null;

  const post = data?.data;

  const handleCommentClick = (commentId: string, content: string) => {
    setSelectedComment(commentId);
    setSelectedCommentContent(content);
    // alert(`Comment ID: ${commentId}, Content: ${content}`);
  };

  const sendMessage = async () => {
    if (!text.trim() || !postId) return;

    try {
      await createPostComment({
        postId,
        content: text,
        parentCommentId: selectedComment, // reply if selected
      }).unwrap();

      setText("");
      setSelectedComment(null);
      setSelectedCommentContent(null);
    } catch (error) {
      console.error("Failed to send comment", error);
    }
  };

  const clearSelectedComment = () => {
    setSelectedComment(null);
    setSelectedCommentContent(null);
  }

  return (
    <div
      // onClick={onClose}
      className="fixed inset-0 bg-black/10 bg-opacity-40 z-50 flex justify-end"
    >
      <div className="w-full md:w-[500px] bg-white h-full p-6 overflow-y-auto shadow-xl">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black mb-4"
        >
          Close
        </button>

        {isLoading && <p>Loading...</p>}

        {post && (
          <div className="bg-green-200/0">
            {/* USER */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={post.createdBy.profilePic}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">
                  {post.createdBy.firstName} {post.createdBy.lastName}'s Post
                </p>
              </div>
            </div>

            {/* CONTENT */}
            {/* <div className="mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {expanded ? post.content : post.content.slice(0, 150)}
              </p>

              {post.content.length > 150 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-600 text-sm mt-2"
                >
                  {expanded ? "See Less" : "See More"}
                </button>
              )}
            </div> */}

            {/* IMAGE */}
            {/* {post.image && (
              <img src={post.image} alt="" className="rounded-lg mb-4" />
            )} */}

            {/* COUNTS */}
            {/* <div className="flex gap-6 text-sm text-gray-600 mb-6">
              <span>❤️ {post.likeCount} Likes</span>
              <span>💬 {post.commentCount} Comments</span>
            </div> */}

            <h3 className="font-semibold mb-1">Comments</h3>
            {/* COMMENTS */}
            <div className="bg-amber-200/0 h-[70vh] overflow-y-auto">
              {post.comments.map((comment: any) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  setSelectedComment={handleCommentClick}
                />
              ))}
            </div>

            {/* Comment text box */}
            <div className="p-2 flex gap-2 bg-white drop-shadow-xl">
              <Input
                className="flex-1 "
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
              />

              <Button
                // appearance="primary"
                className="bg-gray-700 text-white"
                icon={<SendRegular />}
                onClick={sendMessage}
              />
            </div>

            <div className="bg-amber-300/0 h-[10px] w-full text-[10px]">
              {selectedCommentContent && (
                <div className=" w-full cursor-pointer" onClick={clearSelectedComment}>
                  <div className=" bg-gray-100">
                    Replying to: {selectedCommentContent}
                  </div>

                  {/* <div>X</div> */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCommentsDrawer;
