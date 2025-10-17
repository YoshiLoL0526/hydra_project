/**
 * Constantes de la aplicación
 */

// Estados del formulario
export const FORM_STATUS = {
    IDLE: 'idle',
    SUBMITTING: 'submitting',
    SUCCESS: 'success',
    ERROR: 'error',
};

// Tipos de modal
export const MODAL_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Códigos de estado HTTP
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

// Mensajes de validación
export const VALIDATION_MESSAGES = {
    REQUIRED: 'Este campo es requerido',
    EMAIL_INVALID: 'El formato del correo electrónico no es válido',
    PASSWORD_WEAK: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
    NAME_TOO_SHORT: 'El nombre debe tener al menos 3 caracteres',
};

// Configuración de validación
export const VALIDATION_RULES = {
    PASSWORD: {
        MIN_LENGTH: 8,
        REQUIRE_UPPERCASE: true,
        REQUIRE_NUMBER: true,
    },
    NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 100,
    },
};

// Tamaños de modal
export const MODAL_SIZES = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
    EXTRA_LARGE: 'xl',
};

export default {
    FORM_STATUS,
    MODAL_TYPES,
    HTTP_STATUS,
    VALIDATION_MESSAGES,
    VALIDATION_RULES,
    MODAL_SIZES,
};