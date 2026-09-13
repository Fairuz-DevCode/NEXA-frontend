import React from "react";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  loadingText,
  isLoading = false,
  type = "submit",
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 text-parchment-DEFAULT bg-linear-to-br from-parchment-100 to-parchment-200 ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText || "Memproses..."}</span>
        </>
      )
        : (
          <>
            {Icon && <Icon className="w-4 h-4" />}
            <span>{children}</span>
          </>
        )
      }
    </button>
  )
}
