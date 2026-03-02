import { formatDistanceToNow } from "date-fns";

const CommentItem = ({ comment, setSelectedComment }: any) => {
  return (
    <div className="mb-4">
      <div className="flex gap-3 ">
        <img src={comment.userId.profilePic} className="w-8 h-8 rounded-full" />
        <div className="bg-gray-100 py-1 px-2 rounded-xl">
          <p className="font-medium text-sm">
            {comment.userId.firstName} {comment.userId.lastName}
            <span className="text-gray-500 text-[10px] ml-2">
              {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
            </span>
            
          </p>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </div>
      </div>
      {/* reply btn */}
      <div className="ml-12 mt-1 hover:cursor-pointer" onClick={() => setSelectedComment(comment._id, comment.content)}>
        <button className="text-gray-500 text-[11px] hover:cursor-pointer">Reply</button>
      </div>

      {comment.replies?.length > 0 && (
        <div className="ml-10 mt-3 border-l pl-4">
          {comment.replies.map((reply: any) => (
            <CommentItem key={reply._id} comment={reply} setSelectedComment={setSelectedComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
