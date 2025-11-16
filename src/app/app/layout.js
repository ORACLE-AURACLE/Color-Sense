"use client";
import React, { useState } from 'react';
import AppSidebar from '@/layout/app/sidebar';
import AppTopnav from '@/layout/app/topnav';

export default function AppLayout({ children }) {
  const [openMenu, setOpenMenu] = useState(localStorage.getItem("menuOpen") === "true" ? true : false);

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
    localStorage.setItem("menuOpen", openMenu ? "false" : "true");
  }

  return (
    <div className="w-full h-screen flex">
      <AppSidebar open={openMenu} onClose={handleMenuClick} />
      <section className="w-full h-full bg-accent overflow-hidden">
        <AppTopnav />
        <div className='p-4 overflow-x-hidden'>
          {children}
        </div>
      </section>
    </div>
  )
}
