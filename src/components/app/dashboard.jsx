import { ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { app_cards } from "./_data";
import Link from "next/link";

export default function AppDashboard() {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {app_cards.map((item, idx) => (
          <Card
            key={idx}
            className="rounded-2xl sm:rounded-3xl"
          >
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {item?.icon}
              <div className="space-y-1 sm:space-y-2">
                <CardTitle className="text-base sm:text-lg">{item?.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{item?.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

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
            <button type="button" className="bg-white text-black text-balance flex items-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
              <span>Try Now</span>
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
