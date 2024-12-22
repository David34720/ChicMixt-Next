1. Stagger (Effet de décalage)
Qu'est-ce que stagger ?
stagger est utilisé pour décaler les animations de plusieurs éléments. Cela crée un effet où les animations se déclenchent l'une après l'autre avec un intervalle défini.
Fonctionne uniquement avec des groupes d'éléments (par exemple, une NodeList ou un tableau).
Utilisation de base :
javascript
Copier le code
gsap.to(".box", {
  x: 100,
  stagger: 0.2, // Décalage de 0.2 seconde entre chaque animation
});
Options avancées de stagger :
Vous pouvez personnaliser stagger pour des effets plus complexes :
javascript
Copier le code
stagger: {
  each: 0.2, // Intervalle entre chaque élément
  from: "start", // Ordre d'animation : "start", "end", "center", ou un index numérique
  grid: "auto", // Pour les animations sur des grilles
  ease: "power1.inOut", // Ease appliqué au décalage
}
Exemple pour une grille :

javascript
Copier le code
gsap.to(".box", {
  scale: 1.2,
  stagger: {
    grid: "auto",
    from: "center", // Part de l'élément central
    amount: 2, // Durée totale pour animer tous les éléments
  },
});
2. Ease (Accélération/Décélération)
Qu'est-ce que ease ?
Définit la courbe de vitesse d'une animation. Par exemple, une animation peut accélérer doucement et ralentir à la fin.
Les easings courants :
javascript
Copier le code
ease: "linear" // Vitesse constante
ease: "power1.inOut" // Accélération/décélération douce
ease: "bounce" // Effet de rebond
ease: "elastic" // Effet d'élasticité
ease: "steps(5)" // Animation en 5 étapes (discrète)
Exemple avec un rebond :

javascript
Copier le code
gsap.to(".box", {
  y: 100,
  ease: "bounce",
  duration: 2,
});
3. Delay et Repeat
Delay : Ajoute un délai avant que l'animation ne commence.
Repeat : Répète l'animation un certain nombre de fois ou infiniment.
Utilisation :
javascript
Copier le code
gsap.to(".box", {
  x: 200,
  delay: 1, // Commence après 1 seconde
  repeat: 2, // Répète deux fois
  repeatDelay: 0.5, // Délai entre chaque répétition
  yoyo: true, // L'animation revient en arrière après chaque répétition
});
4. Keyframes
Permet d'animer un élément à travers plusieurs étapes (comme en CSS).
Utilisation :
javascript
Copier le code
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 1 },
    { y: 100, duration: 1 },
    { rotation: 360, duration: 1 },
  ],
});
5. Scrub (avec ScrollTrigger)
Rend l'animation synchronisée avec le défilement.
Exemple :
javascript
Copier le code
gsap.to(".box", {
  x: 300,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom top",
    scrub: true, // Animation liée au défilement
  },
});
6. Custom Props (Propriétés personnalisées)
GSAP peut animer n'importe quelle propriété CSS ou JavaScript.
Exemple :
javascript
Copier le code
gsap.to(".box", {
  backgroundColor: "#ff0000", // Couleur de fond
  borderRadius: "50%", // Bord arrondi
  duration: 2,
});
7. Durée et Vitesse
duration : Durée de l'animation en secondes.
speed : Contrôle la vitesse relative des animations.
Exemple :
javascript
Copier le code
gsap.to(".box", {
  x: 200,
  duration: 2, // Durée totale de 2 secondes
});
8. From, To, et FromTo
to : Anime l'élément vers une valeur cible.
from : Anime à partir d'une valeur initiale.
fromTo : Définit à la fois une valeur initiale et une valeur finale.
Exemple :
javascript
Copier le code
gsap.from(".box", { x: -200, opacity: 0 }); // Commence hors écran
gsap.to(".box", { x: 200, opacity: 1 }); // Anime vers la position finale
gsap.fromTo(".box", { x: -200 }, { x: 200, opacity: 1 });
9. Callbacks
onStart : Appelé au début de l'animation.
onUpdate : Appelé pendant l'animation.
onComplete : Appelé à la fin de l'animation.
Exemple :
javascript
Copier le code
gsap.to(".box", {
  x: 100,
  onStart: () => console.log("Animation started"),
  onComplete: () => console.log("Animation complete"),
});
10. Advanced: Motion Paths
Anime un élément le long d'un chemin défini.
Exemple :
javascript
Copier le code
gsap.to(".box", {
  motionPath: {
    path: "M0,0 C100,100 200,100 300,0", // SVG Path
    align: ".box",
    autoRotate: true,
  },
  duration: 3,
});
11. Loops et Timelines
Les timelines permettent de créer des animations complexes et synchronisées.
Exemple :
javascript
Copier le code
const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".box", { x: 100, duration: 1 });
tl.to(".box", { y: 100, duration: 1 });
Résumé des Effets
Propriété	Description
stagger	Décalage entre les animations d'un groupe
ease	Contrôle de l'accélération/décélération
delay	Ajoute un délai avant de commencer
repeat	Répète l'animation
keyframes	Définit plusieurs étapes dans une animation
scrub	Synchronise l'animation avec le défilement
duration	Définit la durée totale
onStart/onComplete	Appelle des fonctions spécifiques


2. ScrollTrigger.batch()
ScrollTrigger.batch() est une fonctionnalité de la librairie ScrollTrigger de GSAP. Elle permet de traiter un ensemble d’éléments (un tableau de sélections) qui vont entrer dans le viewport, et d’animer ces éléments de façon coordonnée et performante, sans avoir à créer un ScrollTrigger distinct pour chaque élément.

Le principe est que vous fournissez un ensemble d'éléments et des callbacks (onEnter, onLeave, etc.). Lorsque ces éléments entrent dans la zone de déclenchement (start: "top 80%" par exemple), ScrollTrigger regroupe (batch) ces éléments qui entrent simultanément dans le viewport et applique l’animation définie.

Par exemple :

js
Copier le code
ScrollTrigger.batch(cardsRef.current, {
  start: "top 80%", 
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
    });
  }
});
Ici, tous les éléments de cardsRef.current qui entrent dans ce seuil (top 80%) seront animés ensemble (ou par petits lots) plutôt que séparément. Cela simplifie le code et améliore les performances, au lieu de créer un ScrollTrigger par carte.

3. Le return de nettoyage dans le useEffect()
Dans React, lorsque vous utilisez useEffect(), la fonction que vous retournez à la fin de l’effet est une fonction de nettoyage (cleanup function). Elle s’exécute avant que le composant ne se démonte ou avant le prochain appel de l’effet (s’il y a re-render).

Ici, cette fonction de nettoyage est utilisée pour « tuer » tous les ScrollTrigger créés lors du montage du composant, afin d’éviter les fuites de mémoire ou les animations zombies lorsque le composant n’est plus dans le DOM.

js
Copier le code
return () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
};
ScrollTrigger.getAll() retourne tous les triggers actuellement actifs.
.forEach((t) => t.kill()) supprime chacun de ces triggers, libérant ainsi les ressources.
Ainsi, lorsque votre composant React est démonté (par exemple, vous changez de page, ou la condition qui l’affiche disparaît), cette fonction est appelée. Elle s’assure que toutes les animations contrôlées par ScrollTrigger sont nettoyées et ne posent pas de problème plus tard.

En résumé :

gsap.set() : Définit l’état initial des éléments sans animation.
ScrollTrigger.batch() : Gère un groupe d’éléments pour des animations coordonnées au scroll, sans dupliquer de multiples triggers.
return () => { ... } dans useEffect() : Fonction de nettoyage appelée au démontage du composant, qui supprime les triggers et évite les problèmes de mémoire et d’animations fantômes.