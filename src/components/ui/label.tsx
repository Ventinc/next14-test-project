import React from "react";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return (
    <label ref={ref} className="px-2 font-medium text-green-900" {...props} />
  );
});

Label.displayName = "Label";
