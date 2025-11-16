import { CircleCheckBig, Eye, Home, User } from "lucide-react";

export const sidebar_data = (isActive) => [
  {
    title: "Home",
    link: "/app",
    icon: <Home className={` ${isActive("/app") ? "text-primary" : ""}`} />
  },
  {
    title: "Simulator",
    link: "/app/simulator",
    icon: <Eye className={` ${isActive("/app/simulator") ? "text-primary" : ""}`} />
  },
  {
    title: "Accessibility",
    link: "/app/accessibility",
    icon: <CircleCheckBig className={` ${isActive("/app/accessibility") ? "text-primary" : ""}`} />
  },
  {
    title: "Profile",
    link: "/app/profile",
    icon: <User className={` ${isActive("/app/profile") ? "text-primary" : ""}`} />
  },
]