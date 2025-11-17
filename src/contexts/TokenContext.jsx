"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as tokenService from '@/lib/services/tokens/tokenService';
import { calculateReward, getActionDescription } from '@/lib/services/tokens/rewards';
import { getNewAchievements, getEarnedAchievements } from '@/lib/services/tokens/achievements';
import { toast } from 'sonner';

const TokenContext = createContext(undefined);

export function TokenProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [stats, setStats] = useState({
    contrastChecks: 0,
    reportsSaved: 0,
    imagesShared: 0,
    visionModesTested: 0,
    loginStreak: 0,
    visionModes: new Set(),
  });
  const [achievements, setAchievements] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkWallet = () => {
      const savedState = localStorage.getItem('colorSense_wallet');
      if (savedState) {
        try {
          const { address } = JSON.parse(savedState);
          setWalletAddress(address);
        } catch (e) {
          setWalletAddress(null);
        }
      } else {
        setWalletAddress(null);
      }
    };

    checkWallet();
    const interval = setInterval(checkWallet, 1000);
    
    window.addEventListener('storage', checkWallet);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkWallet);
    };
  }, []);

  const checkDailyLogin = useCallback(() => {
    if (!walletAddress) return;
    
    const data = tokenService.loadTokenData(walletAddress);
    if (data) {
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = data.stats.lastLoginDate;
      
      // Only award daily login if it's a new day
      if (lastLogin !== today) {
        updateStats({ loginStreak: 1 });
        earnTokens('DAILY_LOGIN', {});
      }
    }
  }, [walletAddress]);

  // Load token data when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      loadTokenData();
      setTimeout(() => {
        checkDailyLogin();
      }, 500);
    } else {
      // Reset when disconnected
      setBalance(0);
      setTotalEarned(0);
      setStats({
        contrastChecks: 0,
        reportsSaved: 0,
        imagesShared: 0,
        visionModesTested: 0,
        loginStreak: 0,
        visionModes: new Set(),
      });
      setAchievements([]);
      setHistory([]);
    }
  }, [walletAddress]);

  const loadTokenData = useCallback(() => {
    if (!walletAddress) return;

    const data = tokenService.loadTokenData(walletAddress);
    if (data) {
      setBalance(data.tokens);
      setTotalEarned(data.totalEarned);
      setStats({
        ...data.stats,
        visionModes: new Set(data.stats.visionModes || []),
      });
      setAchievements(data.achievements || []);
      setHistory(data.history || []);
    }
  }, [walletAddress]);

  const earnTokens = useCallback(async (actionType, context = {}) => {
    if (!walletAddress) {
      console.warn('Cannot earn tokens: No wallet connected');
      return { success: false, error: 'No wallet connected' };
    }

    setIsLoading(true);
    try {
      const rewardAmount = calculateReward(actionType, context);
      
      if (rewardAmount === 0) {
        return { success: false, error: 'No reward for this action' };
      }

      const description = getActionDescription(actionType);

      const result = tokenService.addTokens(
        walletAddress,
        rewardAmount,
        actionType,
        description
      );

      if (result.success) {
        if (context.statUpdates) {
          tokenService.updateStats(walletAddress, context.statUpdates);
        }

        loadTokenData();

        toast.success(`+${rewardAmount} Tokens`, {
          description: description,
          duration: 3000,
        });

        // Check for new achievements
        checkAchievements();

        return {
          success: true,
          amount: rewardAmount,
          newBalance: result.newBalance,
        };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error earning tokens:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, loadTokenData]);

  const checkAchievements = useCallback(() => {
    if (!walletAddress) return;

    const currentStats = tokenService.getStats(walletAddress);
    const earnedIds = tokenService.getEarnedAchievementIds(walletAddress);
    
    const statsForCheck = {
      ...currentStats,
      visionModesTested: currentStats.visionModes?.size || 0,
    };

    const newAchievements = getNewAchievements(statsForCheck, earnedIds);

    newAchievements.forEach(achievement => {
      tokenService.markAchievementEarned(
        walletAddress,
        achievement.id,
        achievement.reward
      );

      toast.success(`Achievement Unlocked!`, {
        description: `${achievement.icon} ${achievement.name}: ${achievement.description}`,
        duration: 5000,
      });

      if (achievement.reward > 0) {
        setTimeout(() => {
          toast.success(`+${achievement.reward} Tokens`, {
            description: `Achievement reward`,
            duration: 3000,
          });
        }, 500);
      }
    });

    loadTokenData();
  }, [walletAddress, loadTokenData]);

  const updateStats = useCallback((statUpdates) => {
    if (!walletAddress) return;

    const result = tokenService.updateStats(walletAddress, statUpdates);
    if (result.success) {
      loadTokenData();
      setTimeout(() => checkAchievements(), 100);
    }
  }, [walletAddress, loadTokenData, checkAchievements]);

  const getBalance = useCallback(() => {
    if (!walletAddress) return 0;
    return tokenService.getTokenBalance(walletAddress);
  }, [walletAddress]);

  const getStats = useCallback(() => {
    if (!walletAddress) return null;
    return tokenService.getStats(walletAddress);
  }, [walletAddress]);

  const getAchievements = useCallback(() => {
    if (!walletAddress) return [];
    return tokenService.getEarnedAchievementIds(walletAddress);
  }, [walletAddress]);


  const value = {
    balance,
    totalEarned,
    stats,
    achievements,
    history,
    isLoading,
    earnTokens,
    updateStats,
    getBalance,
    getStats,
    getAchievements,
    checkAchievements,
    loadTokenData,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
}

