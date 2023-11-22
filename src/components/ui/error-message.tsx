export const ErrorMessage = ({
  children,
}: {
  children: string | undefined;
}) => {
  if (!children) return null;

  return <p className="py-1 pb-1.5 text-sm text-red-500">{children}</p>;
};
