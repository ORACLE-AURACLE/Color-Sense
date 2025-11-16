"use client";
import Image from "next/image";
import logo from "@/components/asset/logo.png";
import { ArrowLeftFromLineIcon, LogOutIcon, Menu } from "lucide-react";
import { sidebar_data } from "./_data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar({ open, onClose }) {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(path);
  };

  const handleMenuClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("menuOpen", "false");
    }
    onClose?.();
  }

  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      handleMenuClick();
    }
  }
  return (
    <menu className={`
      fixed lg:static inset-y-0 left-0 z-50
      h-full flex flex-col transition-all duration-300 ease-in-out 
      bg-white border-r
      ${open ? "w-64" : "w-18 lg:w-18 -translate-x-full lg:translate-x-0"}
    `}>
      <section className="w-full h-16 sm:h-20 p-3 sm:p-4 border-b border-r flex items-center justify-between">
        {open ? (
          <>
            <Image
              src={logo}
              width={131}
              height={25}
              alt="Logo"
              className="object-contain w-auto h-5 sm:h-6"
            />

            <button type="button" className="p-2 rounded-md border" onClick={handleMenuClick}>
              <ArrowLeftFromLineIcon />
            </button>
          </>
        ) : (
          <button type="button" className="p-2" onClick={handleMenuClick}>
            <Menu />
          </button>
        )}
      </section>

      <nav className="w-full h-max px-3 sm:px-4 mt-4 sm:mt-6 flex flex-col gap-2 sm:gap-3 overflow-y-auto">
        {sidebar_data(isActive).map((item, idx) => (
          <Link
            key={idx}
            href={item?.link}
            onClick={handleLinkClick}
            className={`w-full flex items-center gap-4 sm:gap-6 text-sm sm:text-base rounded-md hover:text-primary transition-colors ${
              isActive(item?.link) ? "bg-accent" : ""
            }
            ${open ? "px-3 py-3 sm:py-4" : "px-2 py-2"}
            `}
          >
            {item?.icon}
            {open && <span className="whitespace-nowrap">{item?.title}</span>}
          </Link>
        ))}
      </nav>
      
      <section className="w-full h-16 sm:h-20 border-t mt-auto shrink-0">
        <button type="button" className="w-full h-full flex items-center justify-center gap-2 text-sm sm:text-base rounded-md text-destructive px-3 sm:px-4">
          <LogOutIcon className="size-4 sm:size-5" />
          {open && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </section>
    </menu>
  )
}
