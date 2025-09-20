import { useState } from "react";
import ToastContext, { type StoredToast } from "./ToastContext"
import { Toast, type Props as ToastProps } from "@/components/ui/Toast/Toast"

interface Props {
    children: React.ReactNode
}
const ToastProvider: React.FC<Props> = ({ children }) => {
    const [toasts, setToasts] = useState<StoredToast[]>([]);
    const addToast = (toast: ToastProps) => {
        const storedToast = {
            ...toast,
            id: Math.random().toString()
        }
        setToasts(prev => [...prev, storedToast]);
    }
    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }
    return (
        <ToastContext.Provider value={{
            toasts: toasts,
            addToast,
            removeToast
        }}>
            {children}
            <div id="toast-container"
                style={{
                    position: "fixed",
                    top: "16px",
                    right: "16px",
                    zIndex: "1000"
                }}>
                {toasts.map(t => (
                    <Toast
                        key={t.id}
                        {...t}
                        onClose={() => {
                            t.onClose?.();
                            removeToast(t.id);
                        }}
                    >
                        {t.children}
                    </Toast>
                ))}
            </div>
        </ToastContext.Provider >
    )
}

export default ToastProvider