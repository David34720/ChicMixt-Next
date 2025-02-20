"use client";
import styles from "./MasonryGridGalery.module.scss";
import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { ModalActionsContext } from "../../contexts/ModalContext";
import { gsap } from "gsap";
import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import UploadForm from "./UploadForm";
import EditImageForm from "./EditImageForm";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

interface User {
  role?: string;
}
interface Props {
  onImageUploaded?: () => void;  // Quand une image est uploadée
  isVisible?: boolean;
}

interface ImageData {
  id: number;
  url: string;
  title: string;
  price: string;
  reference: string;
  promotion: boolean;
  nouveaute: boolean;
  description: string;
  position: number;
}

const MasonryGridGalery: React.FC<Props> = ({ onImageUploaded, isVisible }) => {
  const { openModal } = useContext(ModalActionsContext);
  const { data: session } = useSession();
  
  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  const cardsRef = useRef<HTMLDivElement[]>([]);
  const isAdmin = session?.user && (session.user as User).role === "admin";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  /**
   * Construit l’URL complète de l’image
   */
  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) {
      // URL déjà complète
      return url;
    }
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    return `${baseUrl}${url}`;
  };

  /**
   * Fetch des images
   */
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/images");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Erreur chargement images:", error);
      setError(error instanceof Error ? error.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Premier chargement
   */
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  /**
   * Suppression d’image
   */
  const handleDeleteImage = async (imageId: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;
    try {
      const response = await fetch(`/api/images?id=${imageId}`, { method: "DELETE" });
      if (response.ok) {
        setImages((prev) => prev.filter((img) => img.id !== imageId));
        alert("Image supprimée avec succès.");
      } else {
        const errorRes = await response.json();
        alert(`Erreur lors de la suppression : ${errorRes.message}`);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'image :", err);
      alert("Une erreur est survenue.");
    }
  };

  /**
   * Ouvre le formulaire d’upload
   */
  const handleFormUpload = () => {
    openModal(<UploadForm refreshImages={refreshImages} />);
  };

  /**
   * Refresh images (appelé après l’édition ou l’upload)
   */
  const refreshImages = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const response = await fetch("/api/images");
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        setError("Les données récupérées ne sont pas un tableau.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des images :", err);
      setError("Erreur lors de la récupération des images.");
    } finally {
      setLoading(false);
    } 
  };    

  /**
   * Clic sur une image
   */
  const handleImageClick = (image: ImageData) => {
    if (!isAdmin) {
      // Mode client standard : on affiche la modale de commande
      openModal(
        <div className="flex flex-col items-center">
          <img
            src={image.url}
            alt={`gallery-photo-${image.id}`}
            width={800}
            height={600}
            className="rounded-lg"
          />
          <h2 className="mt-4 text-center">{image.title}</h2>
          <p className="mt-4 text-center">{image.description}</p>
          <p className="mt-4 text-center">Référence commande : {image.reference}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              const email = process.env.NEXT_PUBLIC_GMAIL_ORDER;
              const subject = encodeURIComponent(`Commande pour le produit ${image.reference} ${image.title}`);
              const body = encodeURIComponent(
                `Bonjour Fanny,\n\nJe suis intéressé(e) par le produit suivant :\n\n` +
                `🛍️ **Produit** : ${image.title}\n` +
                `🔖 **Référence** : ${image.reference}\n` +
                (image.price ? `💰 **Prix** : ${parseFloat(image.price).toFixed(2)} €\n` : '') +
                `📸 **Description** : ${image.description}\n\n` +
                `Pouvez-vous me donner plus d'informations sur ce produit ?\n\nMerci !`
              );

              window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            }}
          >
            Commander par Email
          </button> 
        </div>
      );
    } else {
      // Mode admin : on ouvre la modale d’édition
      openModal(
        <div className="flex flex-col items-center">
          <EditImageForm
            image={image}
            onSuccess={() => refreshImages()}
          />
        </div>
      );
    }
  };

  /**
   * Drag & Drop (reorder) fin
   */
  const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return;
  
  // Vérification si l'élément déplacé est le même que l'élément cible
  if (active.id !== over.id) {
    // Récupérer les indices des éléments déplacés
    const oldIndex = images.findIndex((img) => img.id === Number(active.id));
    const newIndex = images.findIndex((img) => img.id === Number(over.id));
    // Utiliser arrayMove pour réorganiser le tableau sans inverser les éléments
    const newImages = arrayMove(images, oldIndex, newIndex);

    // Mettre à jour l'état avec le nouvel ordre
    setImages(newImages);

    // Extraire les IDs dans le nouvel ordre pour les envoyer à l'API
    const orderedIds = newImages.map((img) => img.id);
    
    try {
      const response = await fetch("/api/images/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderedIds }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'ordre des images.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la mise à jour de l'ordre des images.");
    }
  }
};


  /**
   * Points de rupture pour Masonry
   */
  const breakpoints = {
    default: 5,
    1024: 4,
    768: 3,
    480: 2,
  };

  if (error) return <div>{error}</div>;
  if (loading) {
    // Spinner de chargement global
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  // ---- Mode ADMIN ----
  if (isAdmin) {
    return (
      <div>
        <div className={`flex items-center gap-4 ${styles.adminMasonryJsx} ${styles.adminCommentForm}`}>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleFormUpload}
          >
            Télécharger une nouvelle image
          </button>
          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDragEnabled}
              onChange={() => setIsDragEnabled(!isDragEnabled)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full transition peer-checked:bg-blue-600"></div>
            <span className="ml-2 text-sm font-medium text-white">
              {isDragEnabled ? "Déplacement : Activé" : "Déplacement : Désactivé"}
            </span>
          </label>
        </div>
        
        <div className={`${styles.masonryGalery} ${styles.section4}`}>
          {isDragEnabled ? (
            // Drag & Drop
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={images.map((image) => image.id)}
                strategy={verticalListSortingStrategy}
              >
                <Masonry
                  breakpointCols={breakpoints}
                  className={styles.myMasonryGrid}
                  columnClassName={styles.myMasonryGridColumn}
                >
                  {images.map((image, index) => (
                    <SortableItem key={image.id} id={image.id}>
                      <div
                        className={styles.cardGallery}
                        ref={(el) => {
                          if (el) cardsRef.current[index] = el;
                        }}
                      >
                        <Image
                          src={getImageUrl(image.url)}
                          alt={`gallery-photo-${image.id}`}
                          width={400}
                          height={600}
                          className="rounded-lg object-cover hover:opacity-80 transition"
                          onClick={() => handleImageClick(image)}
                          loading="lazy"
                          onError={() => {
                            console.error(`Failed to load image ${image.id}`);
                          }}
                          unoptimized={process.env.NODE_ENV === 'production'}
                        />
                      </div>
                    </SortableItem>
                  ))}
                </Masonry>
              </SortableContext>
            </DndContext>
          ) : (
            // Affichage normal
            <Masonry
              breakpointCols={breakpoints}
              className={styles.myMasonryGrid}
              columnClassName={styles.myMasonryGridColumn}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={styles.cardGalery}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={getImageUrl(image.url)}
                    alt={`gallery-photo-${image.id}`}
                    width={400}
                    height={600}
                    className="rounded-lg object-cover hover:opacity-80 transition"
                    onClick={() => handleImageClick(image)}
                    loading="lazy"
                    onError={() => {
                      console.error(`Failed to load image ${image.id}`);
                    }}
                    // unoptimized={process.env.NODE_ENV === 'production'}
                  />

                  {/* Badges nouveauté/promo */}
                  {(image.nouveaute || image.promotion) && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {image.nouveaute && (
                        <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
                          Nouveauté
                        </span>
                      )}
                      {image.promotion && (
                        <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">
                          Promo
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bouton de suppression */}
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                  >
                    Suppr
                  </button>

                  {/* Prix en bas à droite */}
                  { image.price && 
                    image.price !== "" && 
                    image.price !== null && 
                    parseFloat(image.price) !== 0 &&
                    !isNaN(parseFloat(image.price)) && 
                    parseFloat(image.price) > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-sm rounded">
                        {parseFloat(image.price).toFixed(2)} €
                      </div>
                  )}
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </div>
    );
  }

  // ---- Mode VISITEUR (non-admin) ----
  return (
    <div className={`${styles.masonryGalery} ${styles.section4}`}>
      <Masonry
        breakpointCols={breakpoints}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`${styles.cardGalery} cardImg`}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            style={{ position: "relative" }}
          >
            <Image
              src={getImageUrl(image.url)}
              alt={`gallery-photo-${image.id}`}
              width={400}
              height={600}
              className="rounded-lg object-cover hover:opacity-80 transition"
              onClick={() => handleImageClick(image)}
              loading="lazy"
              onError={() => {
                console.error(`Failed to load image ${image.id}`);
              }}
              unoptimized={process.env.NODE_ENV === 'production'}
            />
            {/* Badges nouveauté/promo */}
            {(image.nouveaute || image.promotion) && (
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {image.nouveaute && (
                  <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
                    Nouveauté
                  </span>
                )}
                {image.promotion && (
                  <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">
                    Promo
                  </span>
                )}
              </div>
            )}
            {/* Prix en bas à droite */}
            { image.price && 
              image.price !== "" && 
              image.price !== null && 
              parseFloat(image.price) !== 0 &&
              !isNaN(parseFloat(image.price)) && 
              parseFloat(image.price) > 0 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-sm rounded">
                  {parseFloat(image.price).toFixed(2)} €
                </div>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryGridGalery;
