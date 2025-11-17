import { CheckCircle, Eye } from "lucide-react";

export const app_cards = [
  {
    title: "Try Simulator",
    description: "Upload and test images",
    href: "/app/simulator",
    icon: <div className="blue-gradient w-max p-3 flex items-center justify-center rounded-xl text-[#00D4E0]"><Eye size={32} /></div>
  },
  {
    title: "Run Checker",
    description: "Check accessibility",
    href: "/app/accessibility",
    icon: <div className="green-gradient w-max p-3 flex items-center justify-center rounded-xl text-[#00C897] "><CheckCircle size={32} /></div>
  },
]