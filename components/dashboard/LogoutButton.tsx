import { LogOut } from "lucide-react";
import { LogoutButton as ConfirmLogoutButton } from "@/components/auth/LogoutConfirmDialog";

export function LogoutButton() {
  return (
    <ConfirmLogoutButton className="inline-flex min-h-11 items-center gap-2 border border-line bg-white px-5 text-xs font-bold text-ink transition hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/20">
      <LogOut className="h-4 w-4" aria-hidden="true" /> خروج امن
    </ConfirmLogoutButton>
  );
}
