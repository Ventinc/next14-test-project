import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full rounded-lg border border-b-2 border-green-700 px-4 py-2 text-green-900"
      {...props}
    />
  );
});

Input.displayName = "Input";
