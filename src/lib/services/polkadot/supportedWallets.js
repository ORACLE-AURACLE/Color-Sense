export const SUPPORTED_WALLETS = [
  {
    id: 'polkadot-js',
    name: 'Polkadot.js',
    extensionName: 'polkadot-js',
    installUrl: 'https://polkadot.js.org/extension/',
    icon: '🔷',
    description: 'Official Polkadot browser extension'
  },
  {
    id: 'talisman',
    name: 'Talisman',
    extensionName: 'talisman',
    installUrl: 'https://talisman.xyz/',
    icon: '⚡',
    description: 'Talisman wallet for Polkadot'
  },
  {
    id: 'subwallet',
    name: 'SubWallet',
    extensionName: 'subwallet-js',
    installUrl: 'https://subwallet.app/',
    icon: '🦄',
    description: 'SubWallet browser extension'
  },
  {
    id: 'nova',
    name: 'Nova Wallet',
    extensionName: 'polkadot-js',
    installUrl: 'https://novawallet.io/',
    icon: '⭐',
    description: 'Nova Wallet for mobile and browser'
  }
];

export const getWalletMetadata = (walletId) => {
  return SUPPORTED_WALLETS.find(wallet => wallet.id === walletId);
};

export const getWalletByExtensionName = (extensionName) => {
  return SUPPORTED_WALLETS.find(wallet => wallet.extensionName === extensionName);
};

