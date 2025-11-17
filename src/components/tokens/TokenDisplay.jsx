"use client";
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';
import { useToken } from '@/hooks/useToken';

export default function TokenDisplay({ className }) {
  const { balance } = useToken();

  return (
    <Badge variant="secondary" className={`gap-1.5 ${className}`}>
      <Coins className="size-3.5" />
      <span className="font-mono">{balance.toLocaleString()}</span>
      <span className="hidden sm:inline">Tokens</span>
    </Badge>
  );
}

