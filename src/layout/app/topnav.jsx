"use client";
import { UserCircle2, Menu } from "lucide-react";
import WalletStatus from '@/components/wallet/WalletStatus';
import TokenDisplay from '@/components/tokens/TokenDisplay';
import { useWallet } from '@/contexts/WalletContext';
import Link from 'next/link';

export default function AppTopnav({ onMenuClick }) {
  const { isConnected } = useWallet();

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
        {isConnected && (
          <>
            <TokenDisplay />
            <WalletStatus />
          </>
        )}
        <Link href="/app/profile">
          <button className="p-1.5 sm:p-2 rounded-md hover:bg-accent transition-colors">
            <UserCircle2 className="size-5 sm:size-6" />
          </button>
        </Link>
      </aside>
    </header>
  )
}
