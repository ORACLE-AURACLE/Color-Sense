"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';

export default function WalletStatus() {
  const { selectedAccount, accounts, walletName, disconnect, switchAccount } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!selectedAccount) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedAccount.address);
      setCopied(true);
      toast.success('Address copied', {
        description: 'Wallet address copied to clipboard',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy', {
        description: 'Could not copy address to clipboard',
        duration: 3000,
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected', {
      description: 'You have been disconnected',
      duration: 3000,
    });
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getInitials = (name) => {
    if (!name) return 'AC';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Avatar className="size-6">
            <AvatarFallback className="text-xs">
              {getInitials(selectedAccount.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline font-mono text-xs">
            {formatAddress(selectedAccount.address)}
          </span>
          <span className="sm:hidden font-mono text-xs">
            {formatAddress(selectedAccount.address)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <div className="font-medium">{selectedAccount.name || 'Account'}</div>
            <div className="text-xs text-muted-foreground font-mono">
              {selectedAccount.address}
            </div>
            {walletName && (
              <div className="text-xs text-muted-foreground">
                {walletName}
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {accounts.length > 1 && (
          <>
            <DropdownMenuLabel className="text-xs">Switch Account</DropdownMenuLabel>
            {accounts.map((account) => (
              <DropdownMenuItem
                key={account.address}
                onClick={() => switchAccount(account)}
                className={selectedAccount.address === account.address ? 'bg-accent' : ''}
              >
                <div className="flex items-center gap-2 w-full">
                  <Avatar className="size-6">
                    <AvatarFallback className="text-xs">
                      {getInitials(account.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{account.name || 'Account'}</div>
                    <div className="text-xs text-muted-foreground font-mono truncate">
                      {formatAddress(account.address)}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="size-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4 mr-2" />
              Copy Address
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
          <LogOut className="size-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

