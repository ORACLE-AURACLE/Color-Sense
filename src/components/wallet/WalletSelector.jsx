"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Loader2 } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

export default function WalletSelector({ onSelect }) {
  const { availableWallets, refreshWallets, isLoading } = useWallet();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshWallets();
  }, [refreshWallets]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshWallets();
    setRefreshing(false);
  };

  const installedWallets = availableWallets.filter(w => w.isInstalled);
  const notInstalledWallets = availableWallets.filter(w => !w.isInstalled);

  if (isLoading || refreshing) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {installedWallets.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Available Wallets</h3>
          <div className="space-y-2">
            {installedWallets.map((wallet) => (
              <Button
                key={wallet.id}
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => onSelect(wallet.id)}
              >
                <span className="text-xl mr-3">{wallet.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">{wallet.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <Alert>
          <AlertDescription>
            No wallet extensions detected. Please install a supported wallet.
          </AlertDescription>
        </Alert>
      )}

      {notInstalledWallets.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Install Wallet</h3>
          <div className="space-y-2">
            {notInstalledWallets.map((wallet) => (
              <Button
                key={wallet.id}
                variant="ghost"
                className="w-full justify-start h-auto py-3"
                onClick={() => window.open(wallet.installUrl, '_blank')}
              >
                <span className="text-xl mr-3">{wallet.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">{wallet.description}</div>
                </div>
                <ExternalLink className="size-4 ml-2" />
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Refreshing...
            </>
          ) : (
            'Refresh Wallets'
          )}
        </Button>
      </div>
    </div>
  );
}

