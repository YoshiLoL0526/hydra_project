import axios from 'axios';

// Configuración base de Axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5678/webhook';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores de manera global
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            return Promise.reject({
                status: error.response.status,
                message: error.response.data?.message || 'Error en el servidor',
                data: error.response.data,
            });
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            return Promise.reject({
                status: 0,
                message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
                data: null,
            });
        } else {
            // Algo ocurrió al configurar la petición
            return Promise.reject({
                status: -1,
                message: 'Error al procesar la solicitud',
                data: null,
            });
        }
    }
);

/**
 * Registra un nuevo usuario en el sistema
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.full_name - Nombre completo del usuario
 * @param {string} userData.email - Correo electrónico del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @returns {Promise<Object>} Respuesta del servidor con los datos del usuario registrado
 * @throws {Object} Error con status, message y data
 */
export const registerUser = async (userData) => {
    const response = await apiClient.post('', userData);
    return response.data;
};

/**
 * Maneja los mensajes de error según el código de estado HTTP
 * @param {number} status - Código de estado HTTP
 * @returns {string} Mensaje de error apropiado
 */
export const getErrorMessage = (status) => {
    const errorMessages = {
        201: '¡Registro exitoso! Revisa tu correo electrónico.',
        400: 'Los datos proporcionados no son válidos. Por favor, verifica la información.',
        409: 'Este correo electrónico ya está registrado. Por favor, usa otro o inicia sesión.',
        429: 'Demasiados intentos. Por favor, espera unos minutos antes de intentar nuevamente.',
        500: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
        503: 'El servicio no está disponible temporalmente. Por favor, intenta más tarde.',
        0: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
    };

    return errorMessages[status] || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.';
};

export default apiClient;