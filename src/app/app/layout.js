"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppSidebar from '@/layout/app/sidebar';
import AppTopnav from '@/layout/app/topnav';
import { useWallet } from '@/contexts/WalletContext';

export default function AppLayout({ children }) {
  const router = useRouter();
  const { isConnected } = useWallet();
  const [openMenu, setOpenMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access localStorage after component mounts (client-side)
    if (typeof window !== 'undefined') {
      const savedMenuState = localStorage.getItem("menuOpen");
      // On mobile, default to closed; on desktop, use saved state
      const isMobile = window.innerWidth < 1024;
      setOpenMenu(isMobile ? false : savedMenuState === "true");
    }
  }, []);

  useEffect(() => {
    // Check wallet connection - redirect to landing if not connected
    if (mounted && !isConnected) {
      router.push('/');
    }
  }, [mounted, isConnected, router]);

  useEffect(() => {
    // Handle window resize - close sidebar on mobile when resizing
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile && openMenu) {
          setOpenMenu(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [openMenu]);

  const handleMenuClick = () => {
    const newState = !openMenu;
    setOpenMenu(newState);
    if (typeof window !== 'undefined') {
      // Only save to localStorage on desktop
      if (window.innerWidth >= 1024) {
        localStorage.setItem("menuOpen", newState ? "true" : "false");
      }
    }
  }

  // Don't render app content if not connected
  if (!isConnected) {
    return null;
  }

  return (
    <div className="w-full h-screen flex relative">
      {/* Mobile overlay */}
      {openMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleMenuClick}
        />
      )}
      
      <AppSidebar open={openMenu} onClose={handleMenuClick} />
      <section className="w-full h-full bg-accent overflow-y-auto flex-1">
        <AppTopnav onMenuClick={handleMenuClick} />
        <div className='p-3 sm:p-4 md:p-6 overflow-x-hidden'>
          {children}
        </div>
      </section>
    </div>
  )
}
