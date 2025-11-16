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
    localStorage.setItem("menuOpen", "false");
    onClose?.();
  }
  return (
    <menu className={`h-full flex flex-col transition-all duration-300 ease-in-out ${open ? "w-64" : "w-18"}`}>
      <section className="w-full h-20 p-4 border-b border-r flex items-center justify-between">
        {open ? (
          <>
            <Image
              src={logo}
              width={131}
              height={25}
              alt="Logo"
              className="object-contain"
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

      <nav className="w-full h-max px-4 mt-6 flex flex-col gap-3">
        {sidebar_data(isActive).map((item, idx) => (
          <Link
            key={idx}
            href={item?.link}
            className={`w-full flex items-center gap-6 text-base rounded-md hover:text-primary ${
              isActive(item?.link) ? "bg-accent" : ""
            }
            ${open ? "px-3 py-4" : "px-2 py-2"}
            `}
          >
            {item?.icon}
            {open && <span>{item?.title}</span>}
          </Link>
        ))}
      </nav>
      
      <section className="w-full h-20 border-t mt-auto">
        <button type="button" className="w-full h-full flex items-center justify-center gap-2 text-base rounded-md text-destructive">
          <LogOutIcon />
          {open && <span>Sign Out</span>}
        </button>
      </section>
    </menu>
  )
}
