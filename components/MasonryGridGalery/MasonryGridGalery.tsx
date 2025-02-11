// MasonryGridGalery.tsx
"use client";
import styles from "./MasonryGridGalery.module.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { ModalActionsContext } from "../../contexts/ModalContext";
import { gsap } from "gsap";
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
import SortableItem from "../SortableItem";

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

const MasonryGridGalery: React.FC = () => {
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
      if (tl) tl.kill(); // Vérifie que `tl` existe avant de le tuer
    };
  }, [images]);


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

  const handleFormUpload = () => {
    openModal(<UploadForm refreshImages={refreshImages} />);
  };

  const refreshImages = async () => {
    if (isAdmin) {
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
    }
  };

  const handleImageClick = (image: ImageData) => {
    if (!isAdmin) {
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
            onSuccess={() => refreshImages()}
          />
        </div>
      );
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === Number(active.id));
      const newIndex = images.findIndex((img) => img.id === Number(over.id));
      const newImages = arrayMove(images, oldIndex, newIndex);
      setImages(newImages);
      const orderedIds = newImages.map((img) => img.id);
      try {
        const response = await fetch("/api/images/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ orderedIds }),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'ordre des images.");
        console.log("Ordre mis à jour avec succès.");
      } catch (err) {
        console.error(err);
        alert("Une erreur est survenue lors de la mise à jour de l'ordre des images.");
      }
    }
  };

  const breakpoints = {
    default: 5,
    1024: 4,
    768: 3,
    480: 2,
  };

  if (error) return <div>{error}</div>;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

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
      </div>
    );
  }

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
            className={styles.cardGalery}
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

export default MasonryGridGalery;
