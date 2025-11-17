"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/components/asset/logo.png";
import { ArrowLeftFromLineIcon, LogOutIcon, Menu } from "lucide-react";
import { sidebar_data } from "./_data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Custom Tooltip Component
const SidebarTooltip = ({ children, text, show }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8,
      });
    }
  };

  useEffect(() => {
    if (isHovered && triggerRef.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      const rafId = requestAnimationFrame(() => {
        updatePosition();
      });
      
      // Update on scroll and resize
      const handleScroll = () => {
        requestAnimationFrame(updatePosition);
      };
      const handleResize = () => {
        requestAnimationFrame(updatePosition);
      };
      
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isHovered]);

  if (!show) return children;

  return (
    <>
      <div 
        ref={triggerRef}
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      {isHovered && (
        <div
          className="fixed px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg whitespace-nowrap pointer-events-none z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateY(-50%)',
          }}
        >
          {text}
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </>
  );
};

export default function AppSidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { disconnect } = useWallet();
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

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

  const handleSignOut = () => {
    setShowDisconnectDialog(true);
  };

  const handleConfirmDisconnect = () => {
    disconnect();
    setShowDisconnectDialog(false);
    router.push('/');
  };
  return (
    <menu className={`
      fixed lg:static inset-y-0 left-0 z-50
      h-full flex flex-col transition-all duration-300 ease-in-out 
      bg-white border-r overflow-visible
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

      <nav className="w-full h-max px-3 sm:px-4 mt-4 sm:mt-6 flex flex-col gap-2 sm:gap-3 overflow-y-auto overflow-x-visible">
        {sidebar_data(isActive).map((item, idx) => (
          <SidebarTooltip key={idx} text={item?.title} show={!open}>
            <Link
              href={item?.link}
              onClick={handleLinkClick}
              className={`w-full flex items-center gap-4 sm:gap-6 text-sm sm:text-base rounded-md hover:text-primary transition-colors ${
                isActive(item?.link) ? "bg-accent" : ""
              }
              ${open ? "px-3 py-3 sm:py-4" : "px-2 py-2 justify-center"}
              `}
            >
              {item?.icon}
              {open && <span className="whitespace-nowrap">{item?.title}</span>}
            </Link>
          </SidebarTooltip>
        ))}
      </nav>
      
      <section className="w-full h-16 sm:h-20 border-t mt-auto shrink-0">
        <SidebarTooltip text="Sign Out" show={!open}>
          <button
            type="button"
            onClick={handleSignOut}
            className={`w-full h-full flex items-center justify-center gap-2 text-sm sm:text-base rounded-md text-destructive transition-colors hover:bg-destructive/10 ${
              open ? "px-3 sm:px-4" : "px-2 py-2"
            }`}
          >
            <LogOutIcon className="size-4 sm:size-5" />
            {open && <span className="whitespace-nowrap">Sign Out</span>}
          </button>
        </SidebarTooltip>
      </section>

      <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect Wallet?</DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect your wallet? You'll need to connect again to access the application.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDisconnectDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDisconnect}
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </menu>
  )
}
