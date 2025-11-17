"use client";
import { WalletProvider } from "@/contexts/WalletContext";
import { TokenProvider } from "@/contexts/TokenContext";

export default function Providers({ children }) {
  return (
    <WalletProvider>
      <TokenProvider>
        {children}
      </TokenProvider>
    </WalletProvider>
  );
}

