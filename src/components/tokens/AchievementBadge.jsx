"use client";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { getAchievementById } from '@/lib/services/tokens/achievements';

export function AchievementBadge({ achievementId, size = "default" }) {
  const achievement = getAchievementById(achievementId);
  
  if (!achievement) return null;

  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-0.5",
    large: "text-base px-3 py-1",
  };

  return (
    <Badge variant="secondary" className={`gap-1.5 ${sizeClasses[size]}`}>
      <span>{achievement.icon}</span>
      <span>{achievement.name}</span>
    </Badge>
  );
}

export function AchievementCard({ achievementId }) {
  const achievement = getAchievementById(achievementId);
  
  if (!achievement) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="font-semibold">{achievement.name}</div>
            <div className="text-sm text-muted-foreground">
              {achievement.description}
            </div>
          </div>
          {achievement.reward > 0 && (
            <div className="text-sm font-medium text-primary">
              +{achievement.reward} tokens
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AchievementList({ achievementIds }) {
  if (!achievementIds || achievementIds.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Trophy className="size-12 mx-auto mb-2 opacity-50" />
        <p>No achievements yet</p>
        <p className="text-sm">Complete actions to unlock achievements!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {achievementIds.map((id) => (
        <AchievementCard key={id} achievementId={id} />
      ))}
    </div>
  );
}

