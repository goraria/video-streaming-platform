import { NextRequest, NextResponse } from "next/server";
import axios from "gorth-base/cores/axios";
import { routes } from "@/lib/environment";
import { caller } from "@/lib/caller";
import type { AuthUser, SsoExchangeResponse } from "@/lib/interface";

const appSsoAccessTokenCookie = "sb-access-auth-token";
const appSsoRefreshTokenCookie = "sb-refresh-auth-token";

const ssoExchangeUrl = (() => {
  try {
    return `${new URL(routes.login).origin}/auth/exchange`;
  } catch {
    return null;
  }
})();

function getSsoUser(payload: unknown): AuthUser | null {
  const data = payload as SsoExchangeResponse;

  if (!data.user || typeof data.user.id !== "string" || typeof data.user.email !== "string") {
    return null;
  }

  return data.user;
}

function unauthorized(error: string) {
  const response = NextResponse.json({ user: null, error }, { status: 401 });
  response.cookies.delete(appSsoAccessTokenCookie);
  response.cookies.delete(appSsoRefreshTokenCookie);
  return response;
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(appSsoAccessTokenCookie)?.value;
  const refreshToken = request.cookies.get(appSsoRefreshTokenCookie)?.value;

  if (!accessToken && !refreshToken) {
    return unauthorized("missing_token");
  }

  if (!ssoExchangeUrl) {
    return NextResponse.json({ user: null, error: "missing_sso_url" }, { status: 500 });
  }

  let payload: SsoExchangeResponse;

  try {
    payload = await caller<SsoExchangeResponse>({
      url: ssoExchangeUrl,
      method: "POST",
      headers: {
        ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
        "Content-Type": "application/json",
      },
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      toast: false,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return unauthorized("invalid_sso_token");
    }

    return NextResponse.json({ user: null, error: "sso_unreachable" }, { status: 502 });
  }

  const user = getSsoUser(payload);

  if (!user) {
    return NextResponse.json({ user: null, error: "invalid_sso_response" }, { status: 502 });
  }

  const response = NextResponse.json({ user });
  response.headers.set("Cache-Control", "no-store");
  const nextAccessToken = payload && typeof payload.access_token === "string"
    ? payload.access_token
    : accessToken;
  const nextRefreshToken = payload && typeof payload.refresh_token === "string"
    ? payload.refresh_token
    : refreshToken;

  if (nextAccessToken) {
    response.cookies.set(appSsoAccessTokenCookie, nextAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  if (nextRefreshToken) {
    response.cookies.set(appSsoRefreshTokenCookie, nextRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ user: null });
  response.cookies.delete(appSsoAccessTokenCookie);
  response.cookies.delete(appSsoRefreshTokenCookie);
  return response;
}
