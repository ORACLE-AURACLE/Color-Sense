"use client";
import { ArrowRight, Zap, CheckCircle, FileText, Share2, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { app_cards } from "./_data";
import Link from "next/link";
import { useWallet } from "@/contexts/WalletContext";
import { useToken } from "@/hooks/useToken";
import TokenDisplay from "@/components/tokens/TokenDisplay";
import WalletStatus from "@/components/wallet/WalletStatus";

export default function AppDashboard() {
  const { selectedAccount } = useWallet();
  const { balance, stats } = useToken();

  const userName = selectedAccount?.name || selectedAccount?.address?.slice(0, 6) || "User";

  // Action stats cards
  const actionStats = [
    {
      title: "Contrast Checks",
      value: stats.contrastChecks || 0,
      icon: <CheckCircle className="size-6 sm:size-8 text-[#00C897]" />,
      gradient: "green-gradient",
    },
    {
      title: "Reports Saved",
      value: stats.reportsSaved || 0,
      icon: <FileText className="size-6 sm:size-8 text-[#6366F1]" />,
      gradient: "purple-gradient",
    },
    {
      title: "Images Shared",
      value: stats.imagesShared || 0,
      icon: <Share2 className="size-6 sm:size-8 text-[#00D4E0]" />,
      gradient: "blue-gradient",
    },
    {
      title: "Vision Modes Tested",
      value: stats.visionModes?.size || 0,
      icon: <Palette className="size-6 sm:size-8 text-[#F59E0B]" />,
      gradient: "orange-gradient",
    },
  ];

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Welcome Section with Wallet Info and Tokens */}
      <section className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Continue your journey towards inclusive design.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <TokenDisplay className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base" />
          <WalletStatus />
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {app_cards.map((item, idx) => (
          <Link key={idx} href={item.href || "#"} className="block">
            <Card className="rounded-2xl sm:rounded-3xl cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                {item?.icon}
                <div className="space-y-1 sm:space-y-2">
                  <CardTitle className="text-base sm:text-lg">{item?.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{item?.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Action Stats Cards */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {actionStats.map((stat, idx) => (
          <Card
            key={idx}
            className="rounded-2xl sm:rounded-3xl"
          >
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className={`${stat.gradient} w-max p-3 flex items-center justify-center rounded-xl`}>
                {stat.icon}
              </div>
              <div className="space-y-1 sm:space-y-2">
                <CardTitle className="text-2xl sm:text-3xl font-bold">{stat.value}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{stat.title}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Accessibility Checker Card */}
      <Card className="rounded-2xl sm:rounded-3xl w-full max-w-lg blue-purple-gradient">
        <CardContent className="text-white space-y-3 sm:space-y-4 p-4 sm:p-6">
          <Zap className="size-6 sm:size-8" />

          <div>
            <CardTitle className="text-2xl sm:text-3xl font-medium">Accessibility Checker</CardTitle>
            <CardDescription className="text-white text-sm sm:text-base">
              Check color contrast and get instant feedback on accessibility compliance.
            </CardDescription>
          </div>

          <Link href="/app/accessibility">
            <button type="button" className="bg-white text-black text-balance flex items-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start hover:bg-gray-100 transition-colors">
              <span>Try Now</span>
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
