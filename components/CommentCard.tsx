import React from "react";

interface CommentCardProps {
  commentorName: string;
  message: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ commentorName, message }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <p className="font-semibold text-lg">{commentorName}</p>
      <p className="text-gray-700 mt-2">{message}</p>
    </div>
  );
};

export default CommentCard;
