"use client";

import { useAuth } from "@/hooks/useAuth";
import Loader from "../Loader/Loader";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthenticated } = useAuth("/signin");

  if (loading) return <Loader />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
