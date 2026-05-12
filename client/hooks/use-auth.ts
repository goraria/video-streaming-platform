"use client";

import { createContext, useContext } from "react";
import type { AuthContextValue } from "@/lib/interface";

export const AuthContext = createContext<AuthContextValue>({
  account: null,
  loading: true,
  authenticated: false,
  refresh: async () => null,
  login: () => undefined,
  register: () => undefined,
  logout: async () => undefined,
});

export const useAuth = () => useContext(AuthContext);
