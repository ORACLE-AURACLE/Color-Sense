/**
 * Token reward amounts for different actions
 */
export const TOKEN_REWARDS = {
  // Accessibility Checker
  FIRST_CONTRAST_CHECK: 10,
  CONTRAST_CHECK: 5,
  WCAG_AA_COMPLIANCE: 5,
  WCAG_AAA_COMPLIANCE: 10,
  SAVE_REPORT: 15,
  SHARE_REPORT: 20,
  
  // Simulator
  UPLOAD_IMAGE: 10,
  APPLY_VISION_FILTER: 3,
  SAVE_IMAGE: 10,
  SHARE_IMAGE: 15,
  
  // Engagement
  DAILY_LOGIN: 5,
  READ_VISION_INFO: 5,
  COMPLETE_TUTORIAL: 25,
  VISIT_ALL_PAGES: 20,
  
  // Milestones (awarded separately)
  MILESTONE_10_CHECKS: 50,
  MILESTONE_50_CHECKS: 100,
  MILESTONE_100_CHECKS: 200,
  MILESTONE_ALL_VISION_MODES: 40,
  MILESTONE_5_SHARES: 75,
};

/**
 * Get reward amount for an action
 */
export const getRewardAmount = (actionType) => {
  return TOKEN_REWARDS[actionType] || 0;
};

/**
 * Calculate reward based on action and context
 */
export const calculateReward = (actionType, context = {}) => {
  let baseReward = getRewardAmount(actionType);
  
  // Special handling for first-time actions
  if (context.isFirstTime) {
    const firstTimeAction = `FIRST_${actionType}`;
    const firstTimeReward = getRewardAmount(firstTimeAction);
    if (firstTimeReward > 0) {
      return firstTimeReward;
    }
  }
  
  // Special handling for WCAG compliance
  if (actionType === 'CONTRAST_CHECK' && context.compliance) {
    if (context.compliance.normal?.AAA) {
      return TOKEN_REWARDS.WCAG_AAA_COMPLIANCE;
    } else if (context.compliance.normal?.AA || context.compliance.large?.AA) {
      return TOKEN_REWARDS.WCAG_AA_COMPLIANCE;
    }
  }
  
  return baseReward;
};

/**
 * Get action description for display
 */
export const getActionDescription = (actionType) => {
  const descriptions = {
    FIRST_CONTRAST_CHECK: 'First contrast check',
    CONTRAST_CHECK: 'Contrast check completed',
    WCAG_AA_COMPLIANCE: 'WCAG AA compliance achieved',
    WCAG_AAA_COMPLIANCE: 'WCAG AAA compliance achieved',
    SAVE_REPORT: 'Report saved',
    SHARE_REPORT: 'Report shared',
    UPLOAD_IMAGE: 'Image uploaded',
    APPLY_VISION_FILTER: 'Vision filter applied',
    SAVE_IMAGE: 'Image saved',
    SHARE_IMAGE: 'Image shared',
    DAILY_LOGIN: 'Daily login bonus',
    READ_VISION_INFO: 'Vision information read',
    COMPLETE_TUTORIAL: 'Tutorial completed',
    VISIT_ALL_PAGES: 'All pages visited',
    MILESTONE_10_CHECKS: 'Milestone: 10 checks completed',
    MILESTONE_50_CHECKS: 'Milestone: 50 checks completed',
    MILESTONE_100_CHECKS: 'Milestone: 100 checks completed',
    MILESTONE_ALL_VISION_MODES: 'Milestone: All vision modes tested',
    MILESTONE_5_SHARES: 'Milestone: 5 reports shared',
  };
  
  return descriptions[actionType] || 'Action completed';
};

