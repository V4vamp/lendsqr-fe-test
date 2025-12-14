"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/utils/auth";
import { useRouter } from "next/navigation";

export const useAuth = (redirectTo = "/login") => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.replace(redirectTo);
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router, redirectTo]);

  return { isAuthenticated, loading };
};
