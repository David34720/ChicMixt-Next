"use client";
import styles from './Header.module.scss'
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { ModalActionsContext } from "../../contexts/ModalContext";
import Link from 'next/link';

import ContactModal from "../ContactModal";
import AproposModal from "../AProposModal/AproposModal";
import Login from "../Login";

interface User {
  role?: string;
}

const Header: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const router = useRouter();
  const { openModal } = useContext(ModalActionsContext);
  const { data: session, status } = useSession();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setIsSessionLoaded(true);
    }
  }, [status]);

  if (!isSessionLoaded) {
    return <div>Loading...</div>;
  }

  const handleLoginClick = () => {
    openModal(<Login />);
  };

  const handleContactModal = () => {
    openModal(<ContactModal />);
  };

  const handleAproposModal = () => {
    router.push("/a-propos-boutique-live-mode");  // 🔹 Redirige vers la page overlay
  };

  const adminPage = () => {
    redirect("/admin/admin-page");
  };

  return (
    <header className={`${styles.header} transition-all duration-300 
      ${isScrolled ? 'h-26 bg-blur transition duration-500 ease-in-out' : 'h-32 bg-0 transition duration-500 ease-in-out' }`}>
      <nav className={`${styles.nav}`}>
        {!isScrolled && (
          <div className={`${styles.logo} ${styles.logoXl}`}>
            <span className={styles.logoTxt}>Chic&#39;Mixt</span>
          </div>
        )}
        {isScrolled && (
          <div className={`${styles.logo}`}>
            <span className={styles.logoTxt}>Chic&#39;Mixt</span>
          </div>
        )}
        {session ? (
          <div className={`${styles.login} ${styles.admin}`}>
            <button onClick={() => signOut()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            {session?.user.role === "admin" && (
              <button onClick={adminPage}>Admin</button>
            )}
          </div> 
        ) : (
          <div className={`${styles.login}`}>
            <button onClick={handleLoginClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        )}
        <ul>
          <li>
            <button onClick={handleAproposModal}>À propos</button>
          </li>
          <li>
            <button onClick={handleContactModal}>Contact</button>
          </li>
          {/* <li>
            <Link href="/HookHomePage">HookHomePage</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
