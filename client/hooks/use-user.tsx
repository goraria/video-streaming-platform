'use client'

import { useMemo } from 'react';
import { useAuth } from "@/hooks/use-auth";
import type { AuthUser } from "@/lib/interface";

export function useUser() {
  const { account, loading, authenticated } = useAuth();

  const info: AuthUser | null = useMemo(() => {
    if (!account) return null;
    return account;
  }, [account]);

  return {
    user: info,
    raw: account,
    isLoggedIn: authenticated,
    isLoading: loading,
    session: undefined,
  };
}
