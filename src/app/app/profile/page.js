"use client";
import { useWallet } from '@/contexts/WalletContext';
import { useToken } from '@/hooks/useToken';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AchievementList } from '@/components/tokens/AchievementBadge';
import { Copy, Check, Coins, Trophy, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { selectedAccount, walletName } = useWallet();
  const { balance, totalEarned, stats, achievements, history } = useToken();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!selectedAccount?.address) return;
    try {
      await navigator.clipboard.writeText(selectedAccount.address);
      setCopied(true);
      toast.success('Address copied', {
        description: 'Wallet address copied to clipboard',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy', {
        description: 'Could not copy address to clipboard',
        duration: 3000,
      });
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const getInitials = (name) => {
    if (!name) return 'AC';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!selectedAccount) {
    return (
      <div className="w-full space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Connect your wallet to view your profile
          </p>
        </div>
      </div>
    );
  }

  const achievementIds = achievements.map(a => a.id);

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Profile</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          View your wallet information, token balance, and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Wallet Info */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <CardTitle>Wallet</CardTitle>
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarFallback>
                  {getInitials(selectedAccount.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{selectedAccount.name || 'Account'}</div>
                <div className="text-sm text-muted-foreground font-mono truncate">
                  {formatAddress(selectedAccount.address)}
                </div>
                {walletName && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {walletName}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md border hover:bg-accent transition-colors text-sm"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Address
                </>
              )}
            </button>
          </CardContent>
        </Card>

        {/* Token Balance */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <CardTitle className="flex items-center gap-2">
              <Coins className="size-5" />
              Token Balance
            </CardTitle>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{balance.toLocaleString()}</span>
                <span className="text-muted-foreground">tokens</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Total earned: {totalEarned.toLocaleString()} tokens
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            Statistics
          </CardTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold">{stats.contrastChecks || 0}</div>
              <div className="text-sm text-muted-foreground">Contrast Checks</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.reportsSaved || 0}</div>
              <div className="text-sm text-muted-foreground">Reports Saved</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.imagesShared || 0}</div>
              <div className="text-sm text-muted-foreground">Items Shared</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.visionModesTested || 0}</div>
              <div className="text-sm text-muted-foreground">Vision Modes</div>
            </div>
          </div>
          {stats.loginStreak > 0 && (
            <div className="pt-2 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">🔥 {stats.loginStreak} day streak</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5" />
            Achievements
          </CardTitle>
          <AchievementList achievementIds={achievementIds} />
        </CardContent>
      </Card>

      {/* Recent History */}
      {history && history.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <CardTitle>Recent Activity</CardTitle>
            <div className="space-y-2">
              {history.slice(-10).reverse().map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-md border"
                >
                  <div>
                    <div className="font-medium text-sm">{item.description || item.action}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleString()}
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    +{item.tokens}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
