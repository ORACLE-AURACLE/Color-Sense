"use client";
import { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, Loader2 } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import WalletSelector from './WalletSelector';
import { toast } from 'sonner';

const WalletConnectButton = forwardRef(({ className, variant = "default", onConnectSuccess, asImageButton = false }, ref) => {
  const { isConnected, connect, isLoading } = useWallet();
  const [open, setOpen] = useState(false);

  // Expose open method for external triggers
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true)
  }));

  const handleConnect = async (walletId) => {
    const result = await connect(walletId);
    if (result.success) {
      toast.success('Wallet connected', {
        description: `Connected to ${result.account.name || 'wallet'}`,
        duration: 3000,
      });
      setOpen(false);
      if (onConnectSuccess) {
        onConnectSuccess();
      }
    } else {
      toast.error('Connection failed', {
        description: result.error || 'Failed to connect wallet',
        duration: 5000,
      });
    }
  };

  if (isConnected) {
    return null; // Don't show connect button if already connected
  }

  // If asImageButton is true or className suggests it's an image button (from landing page)
  const isImageButton = asImageButton || className?.includes('hero_auth_button') || 
    className?.includes('wallet_connect') || className?.includes('polkadot_inclusive_wallet_connect_btn') ||
    className?.includes('pre_footer_wallet_connect_button');
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isImageButton ? (
          <button 
            type="button"
            className={className}
            disabled={isLoading}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: isLoading ? 'wait' : 'pointer',
              width: '100%',
              height: '100%'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 p-4">
                <Loader2 className="size-4 animate-spin" />
                <span>Connecting...</span>
              </div>
            ) : (
              <span className="sr-only">Connect Wallet</span>
            )}
          </button>
        ) : (
          <Button variant={variant} className={className} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span className="hidden sm:inline">Connecting...</span>
              </>
            ) : (
              <>
                <Wallet className="size-4 sm:size-5" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Wallet</span>
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your Polkadot wallet to access Color Sense
          </DialogDescription>
        </DialogHeader>
        <WalletSelector onSelect={handleConnect} />
      </DialogContent>
    </Dialog>
  );
});

WalletConnectButton.displayName = 'WalletConnectButton';

export default WalletConnectButton;

