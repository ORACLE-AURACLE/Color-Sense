/**
 * Token service for managing local token storage and operations
 */

const STORAGE_PREFIX = 'colorSense_tokens_';

/**
 * Get storage key for a wallet address
 */
const getStorageKey = (walletAddress) => {
  return `${STORAGE_PREFIX}${walletAddress}`;
};

/**
 * Initialize token data for a wallet
 */
export const initializeTokenData = (walletAddress) => {
  const defaultData = {
    tokens: 0,
    totalEarned: 0,
    stats: {
      contrastChecks: 0,
      reportsSaved: 0,
      imagesShared: 0,
      visionModesTested: 0,
      loginStreak: 0,
      lastLoginDate: null,
      visionModes: new Set(),
    },
    achievements: [],
    history: [],
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };

  saveTokenData(walletAddress, defaultData);
  return defaultData;
};

/**
 * Load token data from localStorage
 */
export const loadTokenData = (walletAddress) => {
  if (!walletAddress) {
    return null;
  }

  try {
    const key = getStorageKey(walletAddress);
    const data = localStorage.getItem(key);
    
    if (!data) {
      return initializeTokenData(walletAddress);
    }

    const parsed = JSON.parse(data);
    
    // Convert visionModes Set from array (localStorage doesn't support Sets)
    if (parsed.stats.visionModes && Array.isArray(parsed.stats.visionModes)) {
      parsed.stats.visionModes = new Set(parsed.stats.visionModes);
    } else {
      parsed.stats.visionModes = new Set();
    }

    return parsed;
  } catch (error) {
    console.error('Error loading token data:', error);
    return initializeTokenData(walletAddress);
  }
};

/**
 * Save token data to localStorage
 */
export const saveTokenData = (walletAddress, data) => {
  if (!walletAddress) {
    return false;
  }

  try {
    const key = getStorageKey(walletAddress);
    
    // Convert visionModes Set to array for storage
    const dataToSave = {
      ...data,
      stats: {
        ...data.stats,
        visionModes: Array.from(data.stats.visionModes || []),
      },
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(key, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Error saving token data:', error);
    return false;
  }
};

/**
 * Add tokens to wallet
 */
export const addTokens = (walletAddress, amount, actionType, description = null) => {
  const data = loadTokenData(walletAddress);
  
  if (!data) {
    return { success: false, error: 'Failed to load token data' };
  }

  data.tokens += amount;
  data.totalEarned += amount;
  
  // Add to history
  data.history.push({
    action: actionType,
    tokens: amount,
    description: description || actionType,
    date: new Date().toISOString(),
  });

  // Keep only last 100 history entries
  if (data.history.length > 100) {
    data.history = data.history.slice(-100);
  }

  saveTokenData(walletAddress, data);
  
  return {
    success: true,
    newBalance: data.tokens,
    totalEarned: data.totalEarned,
  };
};

/**
 * Subtract tokens from wallet
 */
export const subtractTokens = (walletAddress, amount) => {
  const data = loadTokenData(walletAddress);
  
  if (!data) {
    return { success: false, error: 'Failed to load token data' };
  }

  if (data.tokens < amount) {
    return { success: false, error: 'Insufficient tokens' };
  }

  data.tokens -= amount;
  saveTokenData(walletAddress, data);
  
  return {
    success: true,
    newBalance: data.tokens,
  };
};

/**
 * Update stats
 */
export const updateStats = (walletAddress, statUpdates) => {
  const data = loadTokenData(walletAddress);
  
  if (!data) {
    return { success: false, error: 'Failed to load token data' };
  }

  // Update stats
  Object.keys(statUpdates).forEach(key => {
    if (key === 'visionModes' && statUpdates[key]) {
      // Add to visionModes set
      if (!data.stats.visionModes) {
        data.stats.visionModes = new Set();
      }
      if (Array.isArray(statUpdates[key])) {
        statUpdates[key].forEach(mode => data.stats.visionModes.add(mode));
      } else {
        data.stats.visionModes.add(statUpdates[key]);
      }
      // Update count
      data.stats.visionModesTested = data.stats.visionModes.size;
    } else if (key === 'loginStreak') {
      // Handle login streak
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = data.stats.lastLoginDate;
      
      if (lastLogin === today) {
        // Already logged in today
        return;
      }
      
      if (!lastLogin) {
        // First login
        data.stats.loginStreak = 1;
      } else {
        const lastLoginDate = new Date(lastLogin);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate - lastLoginDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day
          data.stats.loginStreak += 1;
        } else if (daysDiff > 1) {
          // Streak broken
          data.stats.loginStreak = 1;
        }
      }
      
      data.stats.lastLoginDate = today;
    } else {
      // Increment numeric stats
      data.stats[key] = (data.stats[key] || 0) + (statUpdates[key] || 1);
    }
  });

  saveTokenData(walletAddress, data);
  
  return {
    success: true,
    stats: data.stats,
  };
};

/**
 * Mark achievement as earned
 */
export const markAchievementEarned = (walletAddress, achievementId, reward = 0) => {
  const data = loadTokenData(walletAddress);
  
  if (!data) {
    return { success: false, error: 'Failed to load token data' };
  }

  // Check if already earned
  const alreadyEarned = data.achievements.some(a => a.id === achievementId);
  if (alreadyEarned) {
    return { success: false, error: 'Achievement already earned' };
  }

  // Add achievement
  data.achievements.push({
    id: achievementId,
    earned: true,
    date: new Date().toISOString(),
  });

  // Add reward if any
  if (reward > 0) {
    data.tokens += reward;
    data.totalEarned += reward;
    
    data.history.push({
      action: `ACHIEVEMENT_${achievementId.toUpperCase()}`,
      tokens: reward,
      description: `Achievement reward: ${achievementId}`,
      date: new Date().toISOString(),
    });
  }

  saveTokenData(walletAddress, data);
  
  return {
    success: true,
    newBalance: data.tokens,
  };
};

/**
 * Get token balance
 */
export const getTokenBalance = (walletAddress) => {
  const data = loadTokenData(walletAddress);
  return data ? data.tokens : 0;
};

/**
 * Get all stats
 */
export const getStats = (walletAddress) => {
  const data = loadTokenData(walletAddress);
  return data ? data.stats : null;
};

/**
 * Get achievement IDs
 */
export const getEarnedAchievementIds = (walletAddress) => {
  const data = loadTokenData(walletAddress);
  return data ? data.achievements.map(a => a.id) : [];
};

/**
 * Clear token data (for testing/debugging)
 */
export const clearTokenData = (walletAddress) => {
  if (!walletAddress) {
    return false;
  }

  try {
    const key = getStorageKey(walletAddress);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing token data:', error);
    return false;
  }
};

