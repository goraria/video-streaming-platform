"use client"

import { Button } from "gorth-ui/custom/button"
import { useAuth } from "@/hooks/use-auth"

export default function Page() {
  const { account, loading, authenticated, login, register, logout } = useAuth()

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {loading ? (
        <Button type="button" disabled>
          Loading
        </Button>
      ) : authenticated ? (
        <Button type="button" onClick={() => logout()}>

          Sign out
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button type="button" onClick={() => login("/demo")}>
            Sign in
          </Button>
          <Button type="button" onClick={() => register("/demo")}>
            Register
          </Button>
        </div>
      )}
        <div className="flex gap-2">
          <Button type="button" onClick={() => login("/demo")}>
            Sign in
          </Button>
          <Button type="button" onClick={() => register("/demo")}>
            Register
          </Button>
        </div>

      <div className="mt-4 p-4 border rounded">
        <h3 className="font-bold">Trạng thái đăng nhập:</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : account ? (
          <pre className="text-xs p-2 overflow-auto">
            {JSON.stringify(
              {
                id: account.id,
                email: account.email,
                app_metadata: account.app_metadata,
                user_metadata: account.user_metadata,
                authenticated,
              },
              null,
              2
            )}
          </pre>
        ) : (
          <p>Chưa đăng nhập</p>
        )}
      </div>
    </div>
  )
}
