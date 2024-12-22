"use client";

import React, { useState, useMemo } from "react";
import { SketchPicker } from "react-color";
import sanitizeHtml from "sanitize-html";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
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
  FaCode,
  FaEraser,
  FaPalette,
  FaFillDrip,
} from "react-icons/fa";

type MenuButton =
  | {
      name: string;
      icon: React.ReactElement;
      action: () => boolean | void;
    }
  | {
      name: "heading";
      icon: React.ReactElement;
      attrs: { level: number };
    }
  | {
      name: "textAlign";
      align: "left" | "center" | "right" | "justify";
      icon: React.ReactElement;
      action: () => boolean | void;
    }
  | {
      name: string;
      icon: React.ReactElement;
      action?: undefined;
    };

// Validation schema with Yup
const schema = yup.object().shape({
  subject: yup
    .string()
    .required("L'objet de la newsletter est requis.")
    .min(5, "L'objet doit contenir au moins 5 caractères."),
  content: yup
    .string()
    .required("Le contenu de la newsletter est requis."),
});

export default function NewsletterAdmin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [displayBackgroundColorPicker, setDisplayBackgroundColorPicker] =
    useState(false);
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
    "#ffffff"
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Initialize TipTap editor with necessary extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue("content", html);
    },
    editable: true,
    immediatelyRender: false,
  });

  const handleTextColor = (color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  };

  const handleBackgroundColor = (color: string) => {
    if (editor) {
      editor.chain().focus().setMark("textStyle", { "background-color": color }).run();
    }
  };

  const onSubmit = async (data: { subject: string; content: string }) => {
    setIsSubmitting(true);

    try {
      const sanitizedContent = sanitizeHtml(data.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "a"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          a: ["href", "target", "rel"],
          img: ["src", "alt", "width", "height"],
        },
      });

      const finalHtmlContent = `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${currentBackgroundColor};">
          <tr>
            <td>
              ${sanitizedContent}
            </td>
          </tr>
        </table>
      `;

      const response = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: data.subject, content: finalHtmlContent }),
      });

      if (response.ok) {
        setStatus("Newsletter envoyée avec succès !");
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

  const menuBar: MenuButton[][] = useMemo(() => [
    [
      { icon: <FaBold />, name: "bold", action: () => editor?.chain().focus().toggleBold().run() },
      { icon: <FaItalic />, name: "italic", action: () => editor?.chain().focus().toggleItalic().run() },
      { icon: <FaUnderline />, name: "underline", action: () => editor?.chain().focus().toggleUnderline().run() },
      { icon: <FaStrikethrough />, name: "strike", action: () => editor?.chain().focus().toggleStrike().run() },
    ],
    [
      { name: "textAlign", align: "left", icon: <FaAlignLeft />, action: () => editor?.chain().focus().setTextAlign("left").run() },
      { name: "textAlign", align: "center", icon: <FaAlignCenter />, action: () => editor?.chain().focus().setTextAlign("center").run() },
      { name: "textAlign", align: "right", icon: <FaAlignRight />, action: () => editor?.chain().focus().setTextAlign("right").run() },
      { name: "textAlign", align: "justify", icon: <FaAlignJustify />, action: () => editor?.chain().focus().setTextAlign("justify").run() },
    ],
    [
      { name: "heading", icon: <FaHeading />, attrs: { level: 1 } },
      { name: "heading", icon: <FaHeading />, attrs: { level: 2 } },
      { name: "heading", icon: <FaHeading />, attrs: { level: 3 } },
    ],
    [
      { icon: <FaListUl />, name: "bulletList" },
      { icon: <FaListOl />, name: "orderedList" },
      { icon: <FaQuoteRight />, name: "blockquote" },
    ],
    [
      { icon: <FaLink />, name: "link", action: () => console.log("Link action") },
      { icon: <FaImage />, name: "image", action: handleImageUpload },
    ],
  ], [editor, handleImageUpload]);

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 gap-y-6 gap-x-4 form-newsletter">
      <h1 className="text-2xl font-bold mb-4">Créer une Newsletter</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div>
          <EditorContent editor={editor} className="editor prose min-h-[200px] p-2" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer la Newsletter"}
        </button>
      </form>
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