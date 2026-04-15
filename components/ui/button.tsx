import * as React from "react"

export function Button({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-black text-white hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}