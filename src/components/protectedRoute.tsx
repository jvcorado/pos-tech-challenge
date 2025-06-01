"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { account, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !account) {
      router.replace("/"); // redireciona para a home
    }
  }, [loading, account, router]);

  if (loading || !account) {
    return null; // ou um spinner/carregamento, se preferir
  }

  return <>{children}</>;
}
