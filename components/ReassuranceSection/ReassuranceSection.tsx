import { useScrollEnterAnimation } from "../../hooks/useScrollEnterAnimation";
import { FaFire, FaShoppingBag, FaShippingFast, FaHeadset } from "react-icons/fa";
export default function ReassuranceSection() {

  useScrollEnterAnimation(".ReassuranceAnimation", {
      duration: 0.8,
      y: 50,
      start: "top 80%",
      end: "top 10%",
      ease: "power2.out",
      stagger: 0.2,
      markers: true
    })

  const features = [
    {
      icon: FaFire,
      title: "Qualité et Tendances",
      description:
        "Des articles sélectionnés avec soin pour répondre à vos envies de mode.",
    },
    {
      icon: FaShoppingBag,
      title: "Achat en Ligne Facile",
      description: "Suivez nos live sur Facebook et commandez directement.",
    },
    {
      icon: FaShippingFast,
      title: "Livraison Rapide",
      description: "Recevez vos achats rapidement partout en France.",
    },
    {
      icon: FaHeadset,
      title: "Service Client Dédié",
      description:
        "Une équipe à votre écoute pour une expérience d'achat optimale.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl bg-white rounded-lg  reassurance-content">
      <h2 className="text-1xl md:text-1xl font-bold text-center mb-8 ReassuranceAnimation">
        Pourquoi Choisir Chic&#39;Mixt ?
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow ReassuranceAnimation"
            >
              <div className="text-primary-500 mb-4">
                <Icon className="text-4xl" style={{ color: "#de277b" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
