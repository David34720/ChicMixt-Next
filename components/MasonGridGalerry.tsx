"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import UploadForm from "../components/UploadForm";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { gsap } from "gsap";
import { useSession } from "next-auth/react";
import EditImageForm from "../components/EditImageForm";

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

interface ImageData {
  id: number;
  url: string;
  title: string;
  description: string;
  position: number;
}

const MasonryGridGallery: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const { data: session } = useSession();

  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /** Toggle local pour activer/désactiver le drag & drop **/
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  const cardsRef = useRef<HTMLDivElement[]>([]);
  const isAdmin = session?.user && (session.user as User).role === "admin";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /** Récupération des images en base **/
  useEffect(() => {
    const fetchImages = async () => {
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
    fetchImages();
  }, []);

  /** Animation GSAP lors de l’apparition des images **/
  useEffect(() => {
    if (!images.length) return;
    gsap.set(cardsRef.current, { opacity: 0, y: 50 });

    const tl = gsap.timeline();
    tl.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, [images]);

  /** Suppression d'une image **/
  const handleDeleteImage = async (imageId: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      return;
    }
    console.log("click - delete image", imageId);

    try {
      const response = await fetch(`/api/images?id=${imageId}`, {
        method: "DELETE",
      });

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

  /** Ouverture du formulaire d’upload **/
  const handleFormUpload = () => {
    openModal(<UploadForm refreshImages={refreshImages} />);
  };

  /** Rafraîchir la liste des images **/
  const refreshImages = async () => {
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

  /** Affichage de l’image en grand (Modale) **/
  const handleImageClick = (image: ImageData) => {
    if(!isAdmin) {
      openModal(
        <div className="flex flex-col items-center">
          <Image
            src={image.url}
            alt={`gallery-photo-${image.id}`}
            width={800}
            height={600}
            className="rounded-lg"
          />
          <h2 className="mt-4 text-center">{image.title}</h2>
          <p className="mt-4 text-center">{image.description}</p>
          <p className="mt-4 text-center">ID : {image.id}</p>
        </div>
      );      
    } else {
      openModal(
        <div className="flex flex-col items-center">
          <Image
            src={image.url}
            alt={`gallery-photo-${image.id}`}
            width={200}
            height={200}
            className="rounded-lg"
          />
          <EditImageForm
        image={image}
        onSuccess={() => {
          // Recharger la liste (optionnel) si on veut voir la maj en direct
          refreshImages();
        }}
      />
        </div>
      );
    }
  };

  /** Gestion du drag & drop => reorder **/
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // si le drop est hors de la zone

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === Number(active.id));
      const newIndex = images.findIndex((img) => img.id === Number(over.id));
      const newImages = arrayMove(images, oldIndex, newIndex);
      setImages(newImages);

      // Envoi de l’ordre mis à jour au backend
      const orderedIds = newImages.map((img) => img.id);
      try {
        const response = await fetch("/api/images/reorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ orderedIds }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de l'ordre des images.");
        }
        console.log("Ordre mis à jour avec succès.");
      } catch (err) {
        console.error(err);
        alert("Une erreur est survenue lors de la mise à jour de l'ordre des images.");
      }
    }
  };

  /** Configuration du Masonry **/
  const breakpoints = {
    default: 5,
    1024: 4,
    768: 3,
    480: 2,
  };

  /** Gestion des erreurs **/
  if (error) {
    return <div>{error}</div>;
  }

  /** Loader si data en cours de chargement **/
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  // --- Mode Admin ---
  if (isAdmin) {
    return (
      <div className="masonry-gallery">
        <div className="flex items-center gap-4 mb-4">
          {/* Bouton Upload à gauche */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleFormUpload}
          >
            Upload
          </button>

          {/* Toggle Switch Drag & Drop (en français) */}
          <label className="inline-flex items-center cursor-pointer select-none">
            {/* Checkbox masqué */}
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDragEnabled}
              onChange={() => setIsDragEnabled(!isDragEnabled)}
            />
            {/* Track */}
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </div>
            {/* Label texte */}
            <span className="ml-2 text-sm font-medium text-gray-900">
              {isDragEnabled ? "Déplacement : Activé" : "Déplacement : Désactivé"}
            </span>
          </label>
        </div>

        {/* Si le Drag & Drop est activé => DndContext */}
        {isDragEnabled ? (
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
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {images.map((image, index) => (
                  <SortableItem key={image.id} id={image.id}>
                    <div
                      className="card-gallery relative"
                      ref={(el) => {
                        if (el) cardsRef.current[index] = el;
                      }}
                    >
                      <Image
                        src={image.url}
                        alt={`Accessoires-vetement-mode-femme-enfant-tendance-${image.id}`}
                        width={400}
                        height={600}
                        className="rounded-lg object-cover hover:opacity-80 transition"
                        onClick={() => handleImageClick(image)}
                        loading="lazy"
                      />                     
                    </div>
                  </SortableItem>
                ))}
              </Masonry>
            </SortableContext>
          </DndContext>
        ) : (
          // Drag désactivé : on affiche simplement le Masonry
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="card-gallery relative"
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <Image
                  src={image.url}
                  alt={`Accessoires-vetement-mode-femme-enfant-tendance-${image.id}`}
                  width={400}
                  height={600}
                  className="rounded-lg object-cover hover:opacity-80 transition"
                  onClick={() => handleImageClick(image)}
                  loading="lazy"
                />
                {/* Bouton Delete toujours disponible */}
                <button
                  className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image.id);
                  }}
                >
                  Suppr
                </button>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    );
  }

  // --- Mode non-admin ---
  return (
    <div className="masonry-gallery">
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="card-gallery relative"
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <Image
              src={image.url}
              alt={`gallery-photo-${image.id}`}
              width={400}
              height={600}
              className="rounded-lg object-cover hover:opacity-80 transition"
              onClick={() => handleImageClick(image)}
              loading="lazy"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryGridGallery;
