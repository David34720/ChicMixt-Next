"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  // Comme seuls des Admin peuvent se connecter, si une session existe c'est que l'utilisateur est admin
  const isAdmin = Boolean(session);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Chic&apos;Mixt</Link>
        </div>

        {/* Navigation Desktop */}
        <nav className={styles.desktopNav}>
          <ul>
            <li>
              <Link href="/a-propos-boutique-live-mode">À propos</Link>
            </li>
            <li>
              <Link href="/contact-chicmixt-herault-mode-tendance">Contact</Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin/admin-page">Admin</Link>
              </li>
            )}
          </ul>
          {isAdmin && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Déconnexion
            </button>
          )}
        </nav>

        {/* Navigation Mobile */}
        <div className={styles.mobileNav}>
          <button onClick={toggleMobileMenu} className={styles.burgerButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={styles.burgerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {mobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <ul>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/a-propos-boutique-live-mode">À propos</Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/contact-chicmixt-herault-mode-tendance">Contact</Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/mentions-legales-chicmixt-live-facebook">Mentions légales</Link>
                </li>
                {isAdmin && (
                  <li onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/admin/admin-page">Admin</Link>
                  </li>
                )}
              </ul>
              {isAdmin && (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Déconnexion
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
