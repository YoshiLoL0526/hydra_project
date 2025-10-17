import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

/**
 * Componente Modal reutilizable con soporte para accesibilidad
 */
const Modal = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    closeOnOverlay = true,
    showCloseButton = true,
}) => {
    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Manejar tecla ESC para cerrar el modal
    const handleEscape = useCallback(
        (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        },
        [isOpen, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [handleEscape]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    const handleOverlayClick = (e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            style={{
                backgroundColor: 'var(--overlay-bg)',
                backdropFilter: 'var(--backdrop-blur)',
            }}
        >
            <div
                className={`relative w-full ${sizeClasses[size]} bg-[rgb(var(--bg-primary))] rounded-lg animate-scaleIn`}
                style={{ boxShadow: 'var(--shadow-modal)' }}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] rounded-full p-1 cursor-pointer"
                        aria-label="Cerrar modal"
                        type="button"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    closeOnOverlay: PropTypes.bool,
    showCloseButton: PropTypes.bool,
};

export default Modal;