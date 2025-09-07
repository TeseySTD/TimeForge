import React, { useEffect, useRef, useState } from 'react'
import './ModalWindow.scss'

export interface Props {
    isOpened: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export const ModalWindow: React.FC<Props> = (
    {
        isOpened,
        onClose,
        children,
        className = ""
    }
) => {
    const modalRef = useRef<HTMLDivElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const prevOverflowRef = useRef<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    const onCloseModal = () => {
        modalRef.current?.classList.add('closing')
        overlayRef.current?.classList.add('closing')
        setTimeout(() => {
            setIsVisible(false)
            onClose()
        }, 300)
    }

    useEffect(() => {
        if (isOpened) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [isOpened])

    useEffect(() => {
        if (!isVisible) return

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onCloseModal()
        }

        prevOverflowRef.current = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', onKey)
        requestAnimationFrame(() => modalRef.current?.focus())

        return () => {
            document.removeEventListener('keydown', onKey)
            if (prevOverflowRef.current !== null) {
                document.body.style.overflow = prevOverflowRef.current
                prevOverflowRef.current = null
            }
        }
    }, [isVisible])

    if (!isVisible) return null

    return (
        <div
            className="modal-overlay"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={"modal-card " + className}
                ref={modalRef}
                tabIndex={-1}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
            >
                <button className="modal-close" aria-label="Close" onClick={onCloseModal}>
                    ×
                </button>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    )
}