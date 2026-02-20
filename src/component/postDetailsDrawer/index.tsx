import { useState } from "react";
import CommentItem from "../commentItem";
import { useGetPostByIdQuery } from "../../service/postApi";

interface Props {
  postId: string | null;
  open: boolean;
  onClose: () => void;
}

const PostDetailsDrawer = ({ postId, open, onClose }: Props) => {
  const { data, isLoading } = useGetPostByIdQuery(postId!, {
    skip: !postId,
  });

  const [expanded, setExpanded] = useState(false);

  if (!open) return null;

  const post = data?.data;

  return (
    <div
      onClick={onClose}
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
          <>
            {/* USER */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={post.createdBy.profilePic}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">
                  {post.createdBy.firstName} {post.createdBy.lastName}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="mb-4">
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
            </div>

            {/* IMAGE */}
            {post.image && (
              <img src={post.image} alt="" className="rounded-lg mb-4" />
            )}

            {/* COUNTS */}
            <div className="flex gap-6 text-sm text-gray-600 mb-6">
              <span>❤️ {post.likeCount} Likes</span>
              <span>💬 {post.commentCount} Comments</span>
            </div>

            {/* COMMENTS */}
            <div>
              <h3 className="font-semibold mb-3">Comments</h3>
              {post.comments.map((comment: any) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetailsDrawer;
