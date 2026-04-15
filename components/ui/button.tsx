import * as React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary"
}

export function Button({
  className,
  variant = "default",
  children,
  ...props
}: ButtonProps) {

  const base = "px-4 py-2 rounded-md transition"

  const variants = {
    default: "bg-black text-white hover:opacity-90",
    outline: "border border-gray-300 text-black",
    secondary: "bg-gray-200 text-black"
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}