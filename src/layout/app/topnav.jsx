import { UserCircle2, Wallet } from "lucide-react";

export default function AppTopnav() {
  return (
    <header className="w-full h-20 bg-white border-b flex px-6 ">
      <aside className="w-max ml-auto flex items-center gap-4">
        <button type="button" className="px-3 py-2 rounded-full border text-base flex items-center gap-2">
          <Wallet />
          Connect Wallet
        </button>
        <button>
          <UserCircle2 />
        </button>
      </aside>
    </header>
  )
}
