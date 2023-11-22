import React from "react";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      className="w-full rounded-lg border border-b-2 border-green-700 bg-green-400/30 px-4 py-2 font-medium text-green-900 hover:bg-green-400/50"
      {...props}
    />
  );
});

Button.displayName = "Button";
