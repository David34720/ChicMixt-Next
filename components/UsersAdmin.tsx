"use client";

import React, { useState, useEffect } from "react";

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  createdAt: string;
}

const UsersAdmin: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les abonnés
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("/api/subscribers");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des abonnés.");
        }
        const data: Subscriber[] = await response.json();
        setSubscribers(data);
      } catch (err) {
        setError((err as Error).message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Changer le statut d'abonnement
  const toggleSubscription = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/subscribers/${id}/toggle`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut.");
      }
      const updatedSubscriber: Subscriber = await response.json();
      setSubscribers((prev) =>
        prev.map((subscriber) =>
          subscriber.id === id ? updatedSubscriber : subscriber
        )
      );
    } catch (err) {
      setError((err as Error).message || "Une erreur est survenue.");
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Liste des abonnés</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Statut</th>
            <th className="border border-gray-300 px-4 py-2">Date d&#39;inscription</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{subscriber.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {subscriber.subscribed ? "Abonné" : "Désabonné"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => toggleSubscription(subscriber.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {subscriber.subscribed ? "Désabonner" : "Réabonner"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;
