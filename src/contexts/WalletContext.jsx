"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { connectWallet, disconnectWallet as disconnectWalletService, validateConnection, getAvailableWallets } from '@/lib/services/polkadot/wallet';

const WalletContext = createContext(undefined);

export function WalletProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [walletName, setWalletName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableWallets, setAvailableWallets] = useState([]);

  // Load wallet state from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    const loadWalletState = async () => {
      try {
        const savedState = localStorage.getItem('colorSense_wallet');
        if (savedState) {
          const { address, walletName: savedWalletName } = JSON.parse(savedState);
          
          // Validate connection and restore full account info
          const isValid = await validateConnection(address);
          if (isValid) {
            // Re-fetch account details to get full information
            try {
              const polkadot = await import('@polkadot/extension-dapp');
              await polkadot.web3Enable('Color Sense');
              const accounts = await polkadot.web3Accounts();
              const account = accounts.find(acc => acc.address === address);
              
              if (account) {
                setIsConnected(true);
                setSelectedAccount({
                  address: account.address,
                  name: account.meta.name || 'Account',
                  source: account.meta.source,
                });
                setAccounts(accounts.map(acc => ({
                  address: acc.address,
                  name: acc.meta.name || 'Account',
                  source: acc.meta.source,
                })));
                setWalletName(savedWalletName || account.meta.source);
              } else {
                // Account not found, clear state
                localStorage.removeItem('colorSense_wallet');
              }
            } catch (error) {
              console.error('Error restoring account details:', error);
              // If we can't restore details, still mark as connected with basic info
              setIsConnected(true);
              setSelectedAccount({ address });
              setWalletName(savedWalletName);
            }
            
            // Get available wallets
            const wallets = await getAvailableWallets();
            setAvailableWallets(wallets);
          } else {
            // Clear invalid state
            localStorage.removeItem('colorSense_wallet');
          }
        }
      } catch (error) {
        console.error('Error loading wallet state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWalletState();
    
    // Also load available wallets
    getAvailableWallets().then(setAvailableWallets);
  }, []);

  const connect = useCallback(async (walletId = null) => {
    setIsLoading(true);
    try {
      const result = await connectWallet(walletId);
      
      if (result.success) {
        setIsConnected(true);
        setSelectedAccount(result.account);
        setAccounts(result.accounts);
        setWalletName(result.extension.name);
        
        // Save to localStorage
        localStorage.setItem('colorSense_wallet', JSON.stringify({
          address: result.account.address,
          walletName: result.extension.name,
        }));
        
        return { success: true, account: result.account };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return { success: false, error: error.message || 'Failed to connect wallet' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    disconnectWalletService();
    setIsConnected(false);
    setSelectedAccount(null);
    setAccounts([]);
    setWalletName(null);
    localStorage.removeItem('colorSense_wallet');
  }, []);

  const switchAccount = useCallback((account) => {
    setSelectedAccount(account);
    localStorage.setItem('colorSense_wallet', JSON.stringify({
      address: account.address,
      walletName: walletName,
    }));
  }, [walletName]);

  const refreshWallets = useCallback(async () => {
    const wallets = await getAvailableWallets();
    setAvailableWallets(wallets);
    return wallets;
  }, []);

  const value = {
    isConnected,
    selectedAccount,
    accounts,
    walletName,
    isLoading,
    availableWallets,
    connect,
    disconnect,
    switchAccount,
    refreshWallets,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

