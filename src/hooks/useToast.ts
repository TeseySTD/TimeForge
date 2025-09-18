import ToastContext from "@/contexts/ToastContext";
import {type Props as ToastProps} from "@/components/ui/Toast/Toast"
import { useContext } from "react"

type ReturnType = [toast: (props:ToastProps) => void, hideToast: (id: string) => void]


/**
 * A hook that provides access to the addToast and removeToast functions.
 *
 * @return [toast: (props:ToastProps) => void, hideToast: (id: string) => void] An array containing the addToast and removeToast functions.
 * @example
 * const [toast, hideToast] = useToast();
 * //Spawns a toast
 * toast({titleText: 'Title', children: 'Description', type: 'success'});
 */
export default function useToast(): ReturnType {
    const {addToast, removeToast} = useContext(ToastContext);
    return [
        addToast,  
        removeToast,
    ]
}