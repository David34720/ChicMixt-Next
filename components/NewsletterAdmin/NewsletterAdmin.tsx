"use client";

import React, { useState, useMemo } from "react";
import sanitizeHtml from "sanitize-html";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// TipTap + Extensions
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";

// Icônes
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaLink,
  FaImage,
} from "react-icons/fa";

// Validation du formulaire
const schema = yup.object().shape({
  subject: yup
    .string()
    .required("L'objet de la newsletter est requis.")
    .min(5, "L'objet doit contenir au moins 5 caractères."),
  content: yup.string().required("Le contenu de la newsletter est requis."),
});

export default function NewsletterAdmin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [currentBackgroundColor] = useState("#ffffff");

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Initialisation de l'éditeur TipTap
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      // On met à jour le champ "content" de RHF au fur et à mesure
      const html = editor.getHTML();
      setValue("content", html);
    },
    editable: true,
  });

  // =========================
  // 1) Fonctions de Toolbar
  // =========================

  // Insertion d'un lien (prompt rapide)
  const handleLink = () => {
    const rawUrl = prompt("Entrez l'URL du lien (ex: https://www.okiweb.fr) :");
    if (!rawUrl) return;

    let url = rawUrl.trim();
    // Si l'utilisateur n'a pas tapé http/https, on préfixe
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    if (editor) {
      editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
    }
  };

  // Upload d'image vers `/api/uploadNewsletterPict`
  const handleImageUpload = useMemo(() => {
    return async () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file && editor) {
          const formData = new FormData();
          formData.append("image", file);

          try {
            const response = await fetch("/api/uploadNewsletterPict", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const { url } = await response.json();
              // On insère l'image dans l'éditeur
              editor.chain().focus().setImage({ src: url }).run();
            } else {
              console.error("Erreur lors de l'upload de l'image.");
            }
          } catch (error) {
            console.error("Erreur réseau lors de l'upload de l'image.", error);
          }
        }
      };
    };
  }, [editor]);

  // =========================
  // 2) MenuBar : définition
  // =========================
  // On définit chaque bouton avec son action
  const menuBar = useMemo(
    () => [
      // Groupe 1 : styles de texte
      [
        {
          icon: <FaBold />,
          name: "bold",
          action: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          icon: <FaItalic />,
          name: "italic",
          action: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
          icon: <FaUnderline />,
          name: "underline",
          action: () => editor?.chain().focus().toggleUnderline().run(),
        },
        {
          icon: <FaStrikethrough />,
          name: "strike",
          action: () => editor?.chain().focus().toggleStrike().run(),
        },
      ],
      // Groupe 2 : alignement
      [
        {
          icon: <FaAlignLeft />,
          name: "alignLeft",
          action: () => editor?.chain().focus().setTextAlign("left").run(),
        },
        {
          icon: <FaAlignCenter />,
          name: "alignCenter",
          action: () => editor?.chain().focus().setTextAlign("center").run(),
        },
        {
          icon: <FaAlignRight />,
          name: "alignRight",
          action: () => editor?.chain().focus().setTextAlign("right").run(),
        },
        {
          icon: <FaAlignJustify />,
          name: "alignJustify",
          action: () => editor?.chain().focus().setTextAlign("justify").run(),
        },
      ],
      // Groupe 3 : titres
      [
        {
          icon: <FaHeading />,
          name: "heading1",
          action: () =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          icon: <FaHeading style={{ fontSize: "0.9em" }} />,
          name: "heading2",
          action: () =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          icon: <FaHeading style={{ fontSize: "0.7em" }} />,
          name: "heading3",
          action: () =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        },
      ],
      // Groupe 4 : listes & blockquote
      [
        {
          icon: <FaListUl />,
          name: "bulletList",
          action: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
          icon: <FaListOl />,
          name: "orderedList",
          action: () => editor?.chain().focus().toggleOrderedList().run(),
        },
        {
          icon: <FaQuoteRight />,
          name: "blockquote",
          action: () => editor?.chain().focus().toggleBlockquote().run(),
        },
      ],
      // Groupe 5 : lien + image
      [
        {
          icon: <FaLink />,
          name: "link",
          action: () => handleLink(),
        },
        {
          icon: <FaImage />,
          name: "image",
          action: handleImageUpload,
        },
      ],
    ],
    [editor, handleImageUpload]
  );

  // =========================
  // 3) Soumission du formulaire
  // =========================
  const onSubmit = async (data: { subject: string; content: string }) => {
    setIsSubmitting(true);

    try {
      // Nettoyage du HTML
      const sanitizedContent = sanitizeHtml(data.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "a"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          a: ["href", "target", "rel"],
          img: ["src", "alt", "width", "height"],
        },
      });

      // On emballe le contenu dans un <table> pour l’email
      const finalHtmlContent = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${currentBackgroundColor};">
          <tr>
            <td>
              ${sanitizedContent}
            </td>
          </tr>
        </table>
      `;

      // Envoi au backend
      const response = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: data.subject, content: finalHtmlContent }),
      });

      if (response.ok) {
        setStatus("Newsletter envoyée avec succès !");
        // Reset du formulaire
        setValue("subject", "");
        editor?.commands.setContent("");
      } else {
        const { error } = await response.json();
        setStatus(error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("Une erreur inconnue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // 4) Rendu
  // =========================
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 gap-y-6 gap-x-4 form-newsletter">
      <h1 className="text-2xl font-bold mb-4">Créer une Newsletter</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Champ objet */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Objet
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject")}
            className={`w-full border rounded px-3 py-2 ${
              errors.subject ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Objet de la newsletter"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* La barre de menu */}
        {editor && (
          <div className="menu-bar flex flex-wrap gap-2 mb-2">
            {menuBar.map((group, groupIdx) => (
              <div key={groupIdx} className="flex gap-2">
                {group.map((btn, btnIdx) => (
                  <button
                    key={btnIdx}
                    type="button"
                    onClick={() => btn.action && btn.action()}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Zone d'édition */}
        <div>
          <h2 style={{color: "#de277b", textAlign: "left", fontSize: "24px"}}>Bonjour,</h2>
          <EditorContent
            editor={editor}
            className="editor prose min-h-[200px] p-2 border border-gray-300 rounded"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div style={{ fontSize: "16px", lineHeight: 1.5, color: "#555", marginTop: "20px", textAlign: "center" }}>
          <p>
            À bientôt, <br />
            <h1 style={{ fontFamily: "'Aboreto', cursive", color: "rgba(0, 0, 0, 0.8)", fontSize: "32px", textAlign: "center", position: "relative", margin: "0 0 20px" }}>
              CHIC'MIXT
              <span style={{ display: "block", fontSize: "16px", fontStyle: "italic", color: "#de277b", marginTop: "-20px" }}>BY Fanny</span>
            </h1>
          </p>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <a href="https://www.facebook.com/profile.php?id=61555657774462" style={{ display: "inline-block", textDecoration: "none", backgroundColor: "#3b5998", color: "#fff", padding: "10px 20px", fontSize: "16px", borderRadius: "5px" }}>
              Suivez-nous sur Facebook
            </a>
          </div>
        </div>

        {/* Bouton Envoyer */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer la Newsletter"}
        </button>
      </form>

      {/* Message de statut */}
      {status && (
        <div
          className={`mt-4 ${
            status.includes("succès") ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}
