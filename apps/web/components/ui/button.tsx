import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref,
  ) => {
    // Variações de estilo harmoniosas com o DESIGN.md
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      default:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-sm dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200/90",
      secondary:
        "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700/80",
      outline:
        "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900/50",
      ghost:
        "text-zinc-100 hover:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900/50",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8 rounded-lg",
    };

    return (
      <button
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
