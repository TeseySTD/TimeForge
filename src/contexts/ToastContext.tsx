import { createContext } from "react";
import { type Props as ToastProps } from "@/components/ui/Toast/Toast";
export type StoredToast = ToastProps & { id: string };
interface ContextProps {
    toasts: StoredToast[];
    addToast: (toast: ToastProps) => void;
    removeToast: (id:string) => void;
}

const ToastContext = createContext<ContextProps>({
    toasts: [],
    addToast: () => { },
    removeToast: () => { },
});

export default ToastContext