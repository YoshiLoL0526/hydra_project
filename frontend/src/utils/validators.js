import { VALIDATION_RULES } from './constants';

/**
 * Valida que un campo no esté vacío
 * @param {string} value - Valor a validar
 * @returns {boolean} True si el valor es válido
 */
export const validateRequired = (value) => {
    return value !== null && value !== undefined && value.trim().length > 0;
};

/**
 * Valida el formato de un correo electrónico
 * @param {string} email - Email a validar
 * @returns {boolean} True si el email tiene un formato válido
 */
export const validateEmail = (email) => {
    // RFC 5322 simplified regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida que la contraseña cumpla con los requisitos de seguridad
 * @param {string} password - Contraseña a validar
 * @returns {boolean} True si la contraseña cumple los requisitos
 */
export const validatePassword = (password) => {
    const { MIN_LENGTH, REQUIRE_UPPERCASE, REQUIRE_NUMBER } = VALIDATION_RULES.PASSWORD;

    if (password.length < MIN_LENGTH) {
        return false;
    }

    if (REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        return false;
    }

    if (REQUIRE_NUMBER && !/\d/.test(password)) {
        return false;
    }

    return true;
};

/**
 * Valida la longitud de un nombre
 * @param {string} name - Nombre a validar
 * @returns {boolean} True si el nombre cumple los requisitos
 */
export const validateName = (name) => {
    const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.NAME;
    const trimmedName = name.trim();

    return trimmedName.length >= MIN_LENGTH && trimmedName.length <= MAX_LENGTH;
};

/**
 * Sanitiza un string eliminando espacios extras
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizado
 */
export const sanitizeString = (str) => {
    return str.trim().replace(/\s+/g, ' ');
};

/**
 * Valida y sanitiza un email
 * @param {string} email - Email a validar y sanitizar
 * @returns {string|null} Email sanitizado o null si es inválido
 */
export const sanitizeEmail = (email) => {
    const sanitized = email.trim().toLowerCase();
    return validateEmail(sanitized) ? sanitized : null;
};

/**
 * Calcula la fortaleza de una contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {Object} Objeto con score (0-4) y feedback
 */
export const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) {
        score++;
    } else {
        feedback.push('Debe tener al menos 8 caracteres');
    }

    if (/[a-z]/.test(password)) {
        score++;
    } else {
        feedback.push('Debe incluir letras minúsculas');
    }

    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        feedback.push('Debe incluir letras mayúsculas');
    }

    if (/\d/.test(password)) {
        score++;
    } else {
        feedback.push('Debe incluir números');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
        feedback.push('Excelente: incluye caracteres especiales');
    }

    const strength = ['Muy débil', 'Débil', 'Aceptable', 'Fuerte', 'Muy fuerte'];

    return {
        score,
        strength: strength[Math.min(score, 4)],
        feedback,
    };
};

export default {
    validateRequired,
    validateEmail,
    validatePassword,
    validateName,
    sanitizeString,
    sanitizeEmail,
    calculatePasswordStrength,
};