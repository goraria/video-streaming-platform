"use client"

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Global - Not Found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
    </div>
  )
}