"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      {children}
    </button>
  );
}
