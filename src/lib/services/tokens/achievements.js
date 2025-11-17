/**
 * Achievement definitions
 */
export const ACHIEVEMENTS = [
  {
    id: 'first_check',
    name: 'First Check',
    description: 'Complete your first contrast check',
    requirement: { type: 'contrastChecks', count: 1 },
    reward: 0, // Already rewarded for the action
    icon: '🎯',
  },
  {
    id: 'accessibility_explorer',
    name: 'Accessibility Explorer',
    description: 'Complete 10 contrast checks',
    requirement: { type: 'contrastChecks', count: 10 },
    reward: 50,
    icon: '🔍',
  },
  {
    id: 'master_checker',
    name: 'Master Checker',
    description: 'Complete 50 contrast checks',
    requirement: { type: 'contrastChecks', count: 50 },
    reward: 100,
    icon: '⭐',
  },
  {
    id: 'accessibility_master',
    name: 'Accessibility Master',
    description: 'Complete 100 contrast checks',
    requirement: { type: 'contrastChecks', count: 100 },
    reward: 200,
    icon: '👑',
  },
  {
    id: 'vision_explorer',
    name: 'Vision Explorer',
    description: 'Test all 8 vision modes',
    requirement: { type: 'visionModesTested', count: 8 },
    reward: 40,
    icon: '👁️',
  },
  {
    id: 'social_contributor',
    name: 'Social Contributor',
    description: 'Share 5 reports',
    requirement: { type: 'reportsShared', count: 5 },
    reward: 75,
    icon: '📤',
  },
  {
    id: 'report_archivist',
    name: 'Report Archivist',
    description: 'Save 10 reports',
    requirement: { type: 'reportsSaved', count: 10 },
    reward: 50,
    icon: '📁',
  },
  {
    id: 'daily_warrior',
    name: 'Daily Warrior',
    description: 'Login for 7 consecutive days',
    requirement: { type: 'loginStreak', count: 7 },
    reward: 35,
    icon: '🔥',
  },
];

/**
 * Check if user qualifies for an achievement
 */
export const checkAchievement = (achievement, stats) => {
  const { requirement } = achievement;
  
  switch (requirement.type) {
    case 'contrastChecks':
      return stats.contrastChecks >= requirement.count;
    case 'visionModesTested':
      return stats.visionModesTested >= requirement.count;
    case 'reportsShared':
      return stats.imagesShared >= requirement.count;
    case 'reportsSaved':
      return stats.reportsSaved >= requirement.count;
    case 'loginStreak':
      return stats.loginStreak >= requirement.count;
    default:
      return false;
  }
};

/**
 * Get all earned achievements
 */
export const getEarnedAchievements = (stats, earnedAchievementIds = []) => {
  return ACHIEVEMENTS.filter(achievement => {
    // Check if already earned
    if (earnedAchievementIds.includes(achievement.id)) {
      return true;
    }
    // Check if newly qualified
    return checkAchievement(achievement, stats);
  });
};

/**
 * Get newly earned achievements (not in earned list)
 */
export const getNewAchievements = (stats, earnedAchievementIds = []) => {
  return ACHIEVEMENTS.filter(achievement => {
    // Skip if already earned
    if (earnedAchievementIds.includes(achievement.id)) {
      return false;
    }
    // Check if newly qualified
    return checkAchievement(achievement, stats);
  });
};

/**
 * Get achievement by ID
 */
export const getAchievementById = (achievementId) => {
  return ACHIEVEMENTS.find(achievement => achievement.id === achievementId);
};

