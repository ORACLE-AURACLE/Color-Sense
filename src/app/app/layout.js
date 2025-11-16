"use client";
import React, { useState, useEffect } from 'react';
import AppSidebar from '@/layout/app/sidebar';
import AppTopnav from '@/layout/app/topnav';

export default function AppLayout({ children }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access localStorage after component mounts (client-side)
    if (typeof window !== 'undefined') {
      const savedMenuState = localStorage.getItem("menuOpen");
      setOpenMenu(savedMenuState === "true");
    }
  }, []);

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
    if (typeof window !== 'undefined') {
      localStorage.setItem("menuOpen", !openMenu ? "true" : "false");
    }
  }

  return (
    <div className="w-full h-screen flex">
      <AppSidebar open={openMenu} onClose={handleMenuClick} />
      <section className="w-full h-full bg-accent overflow-y-auto">
        <AppTopnav />
        <div className='p-4 overflow-x-hidden'>
          {children}
        </div>
      </section>
    </div>
  )
}
