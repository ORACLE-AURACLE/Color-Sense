import { ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { app_cards } from "./_data";
import Link from "next/link";

export default function AppDashboard() {
  return (
    <div className="w-full space-y-6">
      <section className="w-full grid grid-cols-4 gap-4">
        {app_cards.map((item, idx) => (
          <Card
            key={idx}
            className="rounded-3xl"
          >
            <CardContent className="space-y-6">
              {item?.icon}
              <div className="space-y-2">
                <CardTitle>{item?.title}</CardTitle>
                <CardDescription>{item?.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-3xl max-w-lg blue-purple-gradient">
        <CardContent className="text-white space-y-4">
          <Zap size={32} />

          <div>
            <CardTitle className="text-3xl font-medium">Accessibility Checker</CardTitle>
            <CardDescription className="text-white text-base">
              Check color contrast and get instant feedback on accessibility compliance.
            </CardDescription>
          </div>

          <Link href="/app/accessibility">
            <button type="button" className="bg-white text-black text-balance flex items-center gap-2 px-4 py-2 rounded-xl">
              <span>Try Now</span>
              <ArrowRight />
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
