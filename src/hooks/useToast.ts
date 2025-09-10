import ToastContext from "@/contexts/ToastContext";
import {type Props as ToastProps} from "@/components/ui/Toast/Toast"
import { useContext } from "react"

type ReturnType = [toast: (props:ToastProps) => void, hideToast: (id: string) => void]

export default function useToast(): ReturnType {
    const {addToast, removeToast} = useContext(ToastContext);
    return [
        addToast,  
        removeToast,
    ]
}