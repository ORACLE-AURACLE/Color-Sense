"use client";
import { UserCircle2, Wallet, Menu } from "lucide-react";

export default function AppTopnav({ onMenuClick }) {
  return (
    <header className="w-full h-16 sm:h-20 bg-white border-b flex items-center px-3 sm:px-4 md:px-6 sticky top-0 z-30">
      <button 
        type="button" 
        className="lg:hidden p-2 rounded-md hover:bg-accent mr-2"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </button>
      
      <aside className="w-max ml-auto flex items-center gap-2 sm:gap-4">
        <button type="button" className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 hover:bg-accent transition-colors">
          <Wallet className="size-4 sm:size-5" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Wallet</span>
        </button>
        <button className="p-1.5 sm:p-2 rounded-md hover:bg-accent transition-colors">
          <UserCircle2 className="size-5 sm:size-6" />
        </button>
      </aside>
    </header>
  )
}
