import { ThumbLikeRegular, CommentRegular } from "@fluentui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { useToggleLikeMutation } from "../../../service/alertApi";
import { useState } from "react";
import AlertDetailModal from "../AlertDetailModal";

const AlertListItem = ({ alert }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toggleLike] = useToggleLikeMutation();

  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(alert._id);
  };

  return (
    <div
      onClick={(e) => {
        // e.stopPropagation();
        setSelectedId(alert._id);
        setModelOpen(true);
      }}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full"
    >
      {alert.image && (
        <img
          src={alert.image}
          alt={alert.title}
          className="h-56 w-full object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{alert.title}</h3>

        <p className="text-gray-600 text-sm line-clamp-3">
          {alert.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>
            {formatDistanceToNow(new Date(alert.createdAt), {
              addSuffix: true,
            })}
          </span>

          <div className="flex gap-4 items-center">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-red-500"
            >
              <ThumbLikeRegular />
              {alert.likes.length}
            </button>

            <div className="flex items-center gap-1">
              <CommentRegular />
              {alert.comments?.length || 0}
            </div>
          </div>
        </div>
      </div>

      <AlertDetailModal
        alertId={selectedId}
        open={modelOpen}
        // onClose={() => setSelectedId(null)}
        onClose={() => {
          setModelOpen(false);
        }}
      />
    </div>
  );
};

export default AlertListItem;
