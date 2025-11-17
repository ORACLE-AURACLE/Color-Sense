import { SUPPORTED_WALLETS } from './supportedWallets';

// Dynamic import to avoid SSR issues
const getPolkadotExtension = async () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const { web3Accounts, web3Enable, web3FromAddress } = await import('@polkadot/extension-dapp');
    return { web3Accounts, web3Enable, web3FromAddress };
  } catch (error) {
    console.error('Error loading Polkadot extension:', error);
    return null;
  }
};

/**
 * Check if Polkadot extension is available
 */
export const isExtensionAvailable = async () => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const polkadot = await getPolkadotExtension();
    if (!polkadot) return false;
    const extensions = await polkadot.web3Enable('Color Sense');
    return extensions.length > 0;
  } catch (error) {
    console.error('Error checking extension availability:', error);
    return false;
  }
};

/**
 * Get all available wallet extensions
 */
export const getAvailableWallets = async () => {
  if (typeof window === 'undefined') {
    return SUPPORTED_WALLETS.map(wallet => ({ ...wallet, isInstalled: false }));
  }
  try {
    const polkadot = await getPolkadotExtension();
    if (!polkadot) {
      return SUPPORTED_WALLETS.map(wallet => ({ ...wallet, isInstalled: false }));
    }
    const extensions = await polkadot.web3Enable('Color Sense');
    const availableWallets = [];

    extensions.forEach(ext => {
      const wallet = SUPPORTED_WALLETS.find(
        w => w.extensionName === ext.name.toLowerCase() || 
        ext.name.toLowerCase().includes(w.extensionName.toLowerCase())
      );
      
      if (wallet) {
        availableWallets.push({
          ...wallet,
          extension: ext,
          isInstalled: true
        });
      } else {
        // Add unknown extension
        availableWallets.push({
          id: ext.name.toLowerCase().replace(/\s+/g, '-'),
          name: ext.name,
          extensionName: ext.name,
          icon: '🔐',
          description: 'Polkadot compatible wallet',
          extension: ext,
          isInstalled: true
        });
      }
    });

    // Add not installed wallets
    SUPPORTED_WALLETS.forEach(wallet => {
      const isInstalled = availableWallets.some(aw => aw.id === wallet.id);
      if (!isInstalled) {
        availableWallets.push({
          ...wallet,
          isInstalled: false
        });
      }
    });

    return availableWallets;
  } catch (error) {
    console.error('Error getting available wallets:', error);
    return SUPPORTED_WALLETS.map(wallet => ({ ...wallet, isInstalled: false }));
  }
};

/**
 * Connect to Polkadot wallet
 */
export const connectWallet = async (walletId = null) => {
  if (typeof window === 'undefined') {
    return {
      success: false,
      error: 'Wallet connection is only available in the browser.'
    };
  }

  try {
    const polkadot = await getPolkadotExtension();
    if (!polkadot) {
      return {
        success: false,
        error: 'Polkadot extension not available. Please install a supported wallet.'
      };
    }

    // Enable extension
    const extensions = await polkadot.web3Enable('Color Sense');
    
    if (extensions.length === 0) {
      throw new Error('No Polkadot wallet extension found. Please install a supported wallet.');
    }

    // Get accounts from all extensions
    const allAccounts = await polkadot.web3Accounts();
    
    if (allAccounts.length === 0) {
      throw new Error('No accounts found. Please create an account in your wallet extension.');
    }

    // Find the extension that matches the walletId if provided
    let selectedExtension = extensions[0];
    if (walletId) {
      const wallet = SUPPORTED_WALLETS.find(w => w.id === walletId);
      if (wallet) {
        selectedExtension = extensions.find(ext => 
          ext.name.toLowerCase().includes(wallet.extensionName.toLowerCase())
        ) || extensions[0];
      }
    }

    // Get accounts from the selected extension
    const accounts = allAccounts.filter(account => {
      // Try to match accounts with the extension
      return account.meta.source === selectedExtension.name.toLowerCase() ||
             account.meta.source === selectedExtension.name;
    });

    const accountToUse = accounts.length > 0 ? accounts[0] : allAccounts[0];

    return {
      success: true,
      account: {
        address: accountToUse.address,
        name: accountToUse.meta.name || 'Account',
        source: accountToUse.meta.source,
      },
      accounts: allAccounts.map(acc => ({
        address: acc.address,
        name: acc.meta.name || 'Account',
        source: acc.meta.source,
      })),
      extension: {
        name: selectedExtension.name,
        version: selectedExtension.version,
      }
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return {
      success: false,
      error: error.message || 'Failed to connect wallet'
    };
  }
};

/**
 * Get signer for an address
 */
export const getSigner = async (address) => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const polkadot = await getPolkadotExtension();
    if (!polkadot) return null;
    const injector = await polkadot.web3FromAddress(address);
    return injector.signer;
  } catch (error) {
    console.error('Error getting signer:', error);
    return null;
  }
};

/**
 * Disconnect wallet (clear local state)
 */
export const disconnectWallet = () => {
  // Note: We can't actually disconnect from the extension
  // This just clears our local state
  return { success: true };
};

/**
 * Validate wallet connection
 */
export const validateConnection = async (address) => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const polkadot = await getPolkadotExtension();
    if (!polkadot) return false;
    
    // Must call web3Enable first before web3Accounts
    const extensions = await polkadot.web3Enable('Color Sense');
    if (extensions.length === 0) {
      return false;
    }
    
    const accounts = await polkadot.web3Accounts();
    const account = accounts.find(acc => acc.address === address);
    return account !== undefined;
  } catch (error) {
    console.error('Error validating connection:', error);
    return false;
  }
};

