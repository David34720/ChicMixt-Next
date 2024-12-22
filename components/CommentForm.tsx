// components/CommentForm.tsx

import { useState } from "react";

const CommentForm = () => {
  const [commentorName, setCommentorName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentorName || !commentMessage) {
      alert("Le nom et le message sont obligatoires.");
      return;
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentorId: "admin_id", // ID fictif pour l'admin
        commentorName: commentorName,
        message: commentMessage,
      }),
    });

    const result = await response.json();
    if (result.error) {
      console.error(result.error);
      alert("Erreur lors de l'ajout du commentaire.");
    } else {
      setCommentorName("");
      setCommentMessage("");
      alert("Commentaire ajouté !");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 comment-form">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Votre nom :</label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={commentorName}
          onChange={(e) => setCommentorName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700">Votre commentaire :</label>
        <textarea
          id="comment"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          rows={4}
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ajouter le commentaire
      </button>
    </form>
  );
};

export default CommentForm;
