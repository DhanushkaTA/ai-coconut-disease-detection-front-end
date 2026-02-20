const CommentItem = ({ comment }: any) => {
  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <img
          src={comment.userId.profilePic}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-medium text-sm">
            {comment.userId.firstName} {comment.userId.lastName}
          </p>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="ml-10 mt-3 border-l pl-4">
          {comment.replies.map((reply: any) => (
            <CommentItem key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;