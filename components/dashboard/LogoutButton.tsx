import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="post">
      <button className="inline-flex min-h-11 items-center gap-2 border border-line bg-white px-5 text-xs font-bold text-ink transition hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/20">
        <LogOut className="h-4 w-4" /> خروج امن
      </button>
    </form>
  );
}
