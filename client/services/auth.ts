import { api } from "@/lib/caller"
import { routes } from "@/lib/environment"
import type { AuthMeResponse, AuthUser } from "@/lib/interface"

function resolveReturnTo(returnTo = "/") {
  if (typeof window === "undefined") {
    return returnTo
  }

  try {
    return new URL(returnTo, window.location.origin).toString()
  } catch {
    return window.location.origin
  }
}

function redirectToSso(path: string, returnTo = "/") {
  if (typeof window === "undefined") {
    return
  }

  const url = new URL(path)
  url.searchParams.set("redirect", resolveReturnTo(returnTo))
  window.location.assign(url.toString())
}

export async function me(): Promise<AuthUser | null> {
  const payload = await api.get<AuthMeResponse>("/auth/me", {
    toast: false,
  })

  return payload.user ?? null
}

export function login(returnTo = "/") {
  redirectToSso(routes.login, returnTo)
}

export function register(returnTo = "/") {
  redirectToSso(routes.register, returnTo)
}

export async function logout(_returnTo = "/demo") {
  if (typeof window === "undefined") {
    return
  }

  const url = new URL("/auth/sign-out", new URL(routes.login).origin)

  await api.post<{ ok: boolean }>(url.toString(), undefined, {
    toast: false,
    withCredentials: true,
  })

  await api.delete<AuthMeResponse>("/auth/me", {
    toast: false,
  })
}
