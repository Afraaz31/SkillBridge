// Reusable loading spinner.
// Pass `fullPage` for a centered tall container, or use inline by default.
const LoadingSpinner = ({ fullPage = false, size = "md" }) => {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-b-2",
    lg: "h-16 w-16 border-4",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-blue-600 ${sizes[size]}`}
    ></div>
  );

  if (fullPage) {
    return <div className="flex items-center justify-center h-96">{spinner}</div>;
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
};

export default LoadingSpinner;
