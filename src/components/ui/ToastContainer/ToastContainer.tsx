import ToastContext from '@/contexts/ToastContext';
import './ToastContainer.scss'
import { useContext } from 'react';
import { Toast } from '@/components/ui/Toast/Toast';


const ToastContainer: React.FC = () => {
    const {toasts, removeToast} = useContext(ToastContext);
    return (
        <div className="toast-container">
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
    )
}

export default ToastContainer