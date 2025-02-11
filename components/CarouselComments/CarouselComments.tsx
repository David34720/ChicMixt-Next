import React, { useEffect, useState } from "react";
import styles from "./CarouselComments.module.scss";
import { FaQuoteLeft } from "react-icons/fa";

interface Comment {
  id: string;
  commentorName: string;
  message: string;
  createdAt: string;
}

export function CarouselComments() {
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={`${styles.carouselContent} mx-auto max-w-6xl py-4 px-4 rounded-lg`}>
      <h2 className="text-1xl md:text-1xl font-bold text-center mb-4">
        Nos clients parlent de nous...
      </h2>

      {/* Conteneur du carrousel horizontal */}
      <div className="relative">
        {/* Zone "carrousel" avec scroll horizontal */}
        <div
          className="flex space-x-6 overflow-x-scroll scrollbar-none scroll-snap-x p-4"
          style={{
            scrollSnapType: "x mandatory",
          }}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex-shrink-0 w-64 md:w-72 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow scroll-snap-align-start"
            >
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-primary-500 mr-2 text-xl" style={{ color: "#de277b" }} />
                <h3 className="font-semibold">{comment.commentorName}</h3>
              </div>
              <p className={`text-sm text-gray-700 mb-4 ${styles.commentMessage}`}>
                {comment.message}
              </p>
              <div className="text-xs text-gray-400">
                Publié le {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
