import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="container-xxl container-p-y">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 mx-2">404</h1>
          <h4 className="mb-2 mx-2">Page Not Found️ ⚠️</h4>
          <p className="mb-6 mx-2">we couldn&#39;t find the page you are looking for</p>
          <Link href="/" className="">Back to home</Link>
          <div className="mt-6">
            <Image src="/logo/icon.png" alt="page-misc-error-light" width="500" height="500" className="img-fluid" data-app-light-img="illustrations/page-misc-error-light.png" data-app-dark-img="illustrations/page-misc-error-dark.png" style={{ visibility: "visible"}} />
          </div>
        </div>
      </div>
    </div>
  )
}
