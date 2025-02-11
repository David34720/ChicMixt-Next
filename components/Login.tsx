import { useContext } from "react";
import { signIn } from "next-auth/react";
import { ModalActionsContext } from "../contexts/ModalContext";

export default function Login() {
  const { closeModal } = useContext(ModalActionsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // Récupère le formulaire via e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Gère manuellement la redirection
    });

    if (result?.error) {
      console.error("Erreur de connexion:", result.error);
      alert("Échec de la connexion. Vérifiez vos identifiants.");
    } else if (result?.ok) {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Se connecter</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
