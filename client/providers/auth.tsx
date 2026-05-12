"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "@/hooks/use-auth";
import type { AuthContextValue, AuthUser } from "@/lib/interface";
import {
  me as getMe,
  login as requestLogin,
  register as requestRegister,
  logout as requestLogout,
} from "@/services/auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [account, setAccount] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const nextAccount = await getMe();
      setAccount(nextAccount);
      return nextAccount;
    } catch {
      setAccount(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((returnTo = "/demo") => {
    if (account) {
      return;
    }

    requestLogin(returnTo);
  }, [account]);

  const register = useCallback((returnTo = "/demo") => {
    if (account) {
      return;
    }

    requestRegister(returnTo);
  }, [account]);

  const logout = useCallback(async (returnTo = "/demo") => {
    setLoading(true);

    try {
      await requestLogout(returnTo);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      account,
      loading,
      authenticated: Boolean(account),
      refresh,
      login,
      register,
      logout,
    }),
    [account, loading, login, refresh, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function Auth({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
