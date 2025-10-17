import PropTypes from 'prop-types';
import Modal from '../common/Modal';

/**
 * Configuración de estilos y contenido para cada tipo de estado
 */
const STATUS_CONFIG = {
    success: {
        title: '¡Éxito!',
        buttonText: 'Aceptar',
        icon: (
            <svg
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'rgb(var(--color-success))' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
    error: {
        title: 'Error',
        buttonText: 'Entendido',
        icon: (
            <svg
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'rgb(var(--color-error))' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
};

/**
 * Componente Modal de Estado
 * Muestra mensajes de éxito o error en un modal
 */
const StatusModal = ({ isOpen, onClose, type, message }) => {
    const config = STATUS_CONFIG[type] || STATUS_CONFIG.error;

    const buttonClass = `
    w-full py-3 px-4 rounded-lg font-medium 
    text-white transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    cursor-pointer
    ${type === 'success'
            ? 'bg-[rgb(var(--color-success))] hover:bg-[rgb(var(--color-success-hover))] focus:ring-[rgb(var(--color-success))]'
            : 'bg-[rgb(var(--color-error))] hover:bg-[rgb(var(--color-error-hover))] focus:ring-[rgb(var(--color-error))]'
        }
  `;

    const messageClass = `
    text-base mb-6
    ${type === 'success'
            ? 'text-[rgb(var(--color-success-text))]'
            : 'text-[rgb(var(--color-error-text))]'
        }
  `;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="p-6">
                <div className="text-center">
                    {config.icon}

                    <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                        {config.title}
                    </h3>

                    <p className={messageClass} role="alert">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={buttonClass}
                        type="button"
                        autoFocus
                    >
                        {config.buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

StatusModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
};

export default StatusModal;