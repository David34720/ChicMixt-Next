import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import CommentCard from "./CommentCard"; // Import du composant CommentCard

interface Comment {
  id: string;
  commentorName: string;
  message: string;
}

export function MasonryGridComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        const data = await response.json();

        // Vérification si la réponse est bien un tableau
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setError("Les données récupérées ne sont pas un tableau.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        setError("Erreur lors de la récupération des commentaires.");
      }
    };

    fetchComments();
  }, []);

  const breakpoints = {
    default: 3, // 3 colonnes pour les grands écrans
    1024: 3,   // 3 colonnes pour les écrans moyens
    768: 2,    // 2 colonnes pour les tablettes
    480: 1,    // 1 colonne pour les petits écrans
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          commentorName={comment.commentorName}
          message={comment.message}
        />
      ))}
    </Masonry>
  );
}
