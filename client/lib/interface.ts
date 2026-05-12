
import type { User } from "gorth-base/cores/supabase-js"

export type AuthUser = User

export type CallerMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type CallerToastConfig =
  | boolean
  | {
      loading?: string
      success?: string
      error?: string
    }

export interface CallerOptions<TData = unknown> {
  url: string
  method?: CallerMethod
  data?: TData
  params?: Record<string, unknown>
  headers?: Record<string, string>
  timeout?: number
  toast?: CallerToastConfig
  withCredentials?: boolean
}

export type CallerRequestOptions<TData = unknown> = Omit<
  CallerOptions<TData>,
  "method" | "url"
>

export interface AuthContextValue {
  account: AuthUser | null
  loading: boolean
  authenticated: boolean
  refresh: () => Promise<AuthUser | null>
  login: (returnTo?: string) => void
  register: (returnTo?: string) => void
  logout: (returnTo?: string) => Promise<void>
}

export interface AuthMeResponse {
  user?: AuthUser | null
  error?: string
}

export interface SsoExchangeResponse {
  user?: AuthUser | null
  sso_sub?: string
  email?: string
  access_token?: string
  refresh_token?: string
  error?: string
}

export interface SubscribeButtonProps {
  defaultSubscribed?: boolean
  isSubscribed?: boolean
  className?: string
  onSubscribedChange?: (subscribed: boolean) => void
  onNotificationChange?: (value: "all" | "personalized" | "none") => void
}

export interface MembershipButtonProps {
  channelName?: string
  className?: string
}

export interface CommunityButtonProps {
  channelSlug: string
  className?: string
}

// =============================================================================
// =============================================================================
// =============================================================================

export interface Channel {
  id?: string
  name?: string
  handle?: string
  avatar?: string
  subscribers?: number,
  videos?: number,
  description?: string,
  links?: [
    { title: "Waddles.com", href: "waddles.com" },
    { title: "Subscribe here!", href: "youtube.com/@waddles?sub_confirmation=1" },
    { title: "Waddles Facebook", href: "facebook.com/waddles" },
    { title: "Waddles Instagram", href: "instagram.com/waddles" },
    { title: "Waddles TikTok", href: "tiktok.com/@waddles" },
  ],
  url?: string,
  location?: string,
  joined?: Date,
  views?: number,
}

export interface Video {
  id?: string | undefined
  thumbnail: string
  title: string
  duration?: string
  publishedAt?: string
  description?: string
}
