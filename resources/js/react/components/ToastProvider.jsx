import React from "react";

const ToastContext = React.createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function remove(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function push(type, message, ms = 3200) {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, type, message }]);

    window.setTimeout(() => remove(id), ms);
    return id;
  }

  const api = React.useMemo(
    () => ({
      success: (msg, ms) => push("success", msg, ms),
      error: (msg, ms) => push("error", msg, ms),
      info: (msg, ms) => push("info", msg, ms),
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Toast stack */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          display: "grid",
          gap: 10,
          zIndex: 9999,
          width: 340,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "#fff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              fontSize: 14,
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 4 }}>
              {t.type === "success" ? "Success" : t.type === "error" ? "Error" : "Info"}
            </div>
            <div style={{ opacity: 0.9 }}>{t.message}</div>

            <button
              onClick={() => remove(t.id)}
              style={{
                marginTop: 8,
                padding: "6px 10px",
                fontSize: 12,
                cursor: "pointer",
              }}
              type="button"
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>.");
  return ctx;
}
