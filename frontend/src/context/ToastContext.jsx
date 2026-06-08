import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Remove a toast by id
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Show a toast: type = "success" | "error" | "info"
  const showToast = useCallback(
    (message, type = "success") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      // Auto-dismiss after 3 seconds
      setTimeout(() => removeToast(id), 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container (top-right) */}
      <div className="fixed top-4 right-4 z-[100] space-y-2">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const toastStyles = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
};

const Toast = ({ toast, onClose }) => {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[260px] max-w-sm animate-[slideIn_0.2s_ease-out] ${
        toastStyles[toast.type] || toastStyles.success
      }`}
    >
      <span className="text-sm font-medium">{toast.message}</span>
      <button onClick={onClose} className="text-white/80 hover:text-white text-lg leading-none">
        ×
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
