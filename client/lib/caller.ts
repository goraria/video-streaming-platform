import axios from "gorth-base/cores/axios"
import type {
  CallerMethod,
  CallerOptions,
  CallerRequestOptions,
  CallerToastConfig,
} from "@/lib/interface"

const callerInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

async function getToast() {
  if (typeof window === "undefined") {
    return null
  }

  const module = await import("gorth-ui/cores/sonner")
  return module.toast
}

function resolveToastMessage(
  toast: CallerToastConfig | undefined,
  type: "loading" | "success" | "error",
  fallback?: string
) {
  if (!toast) {
    return null
  }

  if (toast === true) {
    return fallback ?? null
  }

  return toast[type] ?? fallback ?? null
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data

    if (
      responseData &&
      typeof responseData === "object" &&
      "error" in responseData &&
      typeof responseData.error === "string"
    ) {
      return responseData.error
    }

    return error.message
  }

  return error instanceof Error ? error.message : "Request failed"
}

async function notify(
  toast: CallerToastConfig | undefined,
  type: "success" | "error",
  message: string | null
) {
  if (!message || !toast) {
    return
  }

  const toastApi = await getToast()
  toastApi?.[type](message)
}

async function startLoadingToast(toast: CallerToastConfig | undefined) {
  const message = resolveToastMessage(toast, "loading")

  if (!message) {
    return null
  }

  const toastApi = await getToast()
  return toastApi?.loading(message) ?? null
}

async function dismissToast(id: string | number | null) {
  if (!id) {
    return
  }

  const toastApi = await getToast()
  toastApi?.dismiss(id)
}

export async function caller<TResponse = unknown, TData = unknown>({
  url,
  method = "GET",
  data,
  params,
  headers,
  timeout,
  toast = false,
  withCredentials = true,
}: CallerOptions<TData>): Promise<TResponse> {
  const loadingToastId = await startLoadingToast(toast)

  try {
    const response = await callerInstance.request<TResponse>({
      url,
      method,
      data,
      params,
      headers,
      timeout,
      withCredentials,
    })

    await dismissToast(loadingToastId)
    await notify(toast, "success", resolveToastMessage(toast, "success"))

    return response.data
  } catch (error) {
    await dismissToast(loadingToastId)
    await notify(
      toast,
      "error",
      resolveToastMessage(toast, "error", getErrorMessage(error))
    )

    throw error
  }
}

function request<TResponse, TData = unknown>(
  method: CallerMethod,
  url: string,
  options?: CallerRequestOptions<TData>
) {
  return caller<TResponse, TData>({
    ...options,
    url,
    method,
  })
}

export const api = {
  get<TResponse>(url: string, options?: CallerRequestOptions) {
    return request<TResponse>("GET", url, options)
  },
  post<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    options?: CallerRequestOptions<TData>
  ) {
    return request<TResponse, TData>("POST", url, { ...options, data })
  },
  put<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    options?: CallerRequestOptions<TData>
  ) {
    return request<TResponse, TData>("PUT", url, { ...options, data })
  },
  patch<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    options?: CallerRequestOptions<TData>
  ) {
    return request<TResponse, TData>("PATCH", url, { ...options, data })
  },
  delete<TResponse>(url: string, options?: CallerRequestOptions) {
    return request<TResponse>("DELETE", url, options)
  },
}
