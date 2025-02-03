"use client";

import React, { useState, useEffect, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSectionContext } from "./AppWrapper";
import { ModalContext } from "../contexts/ModalContext";
import Link from 'next/link';

import ContactModal from "../components/ContactModal"
import AproposModal from "../components/AproposModal"
import Login from "../components/Login";

interface User {
  role?: string;
}

const Header: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const { navigateToSection } = useSectionContext();
  const { openModal } = useContext(ModalContext);
  const { data: session, status } = useSession();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setIsSessionLoaded(true);  // Indique que la session est chargée
    }
  }, [status]);

  if (!isSessionLoaded) {
    return <div>Loading...</div>; // Afficher un loading tant que la session n'est pas chargée
  }
  const handleLoginClick = () => {
    openModal(
      <Login />
    );
  };

  const handleContactModal = () => {
    openModal(<ContactModal />)
  }

  const handleAproposModal = () => {
    openModal(<AproposModal />)
  }
  const adminPage = () => {
    redirect("/admin/admin-page")
  }

  return (
    <header className={`header transition-all duration-300 
      ${isScrolled ? 'h-26 bg-blur transition duration-500 ease-in-out' : 'h-32 bg-0 transition duration-500 ease-in-out' }`}>
      <nav className={'nav'}>

        {!isScrolled && (
        <div className={`logo logo-xl `}>
          <span className="logo-txt">Chic&#39;Mixt</span>
        </div>
        )}
        {isScrolled && (
        <div className={`logo logo-xs `}>
          <span className="logo-txt">Chic&#39;Mixt</span>
        </div>
        )}
        {session ? (
          <div className="login admin">
            
            <button
              onClick={() => signOut()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            {session?.user.role === "admin" && (
              <button onClick={adminPage}>Admin</button>
            )}
          </div>
        ) : (
          <div className="login">
            <button onClick={handleLoginClick}>              
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            </button>
          </div>
        )}
        <ul>
          <li>
            <button className="dekstop" onClick={() => navigateToSection(2)}>Découvrir</button>
          </li>
          <li>
            <button onClick={() => handleAproposModal()}>À propos</button>
          </li>
          <li>
            <button onClick={() => handleContactModal()}>Contact</button>
          </li>
          <li>
            <Link href="/HookHomePage">
              HookHomePage
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
