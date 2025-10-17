import { useState } from 'react';
import { getErrorMessage, registerUser } from '../../services/api';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validators';
import FormInput from '../common/FormInput';
import StatusModal from '../modals/StatusModal';

const INITIAL_FORM_STATE = {
    fullName: '',
    email: '',
    password: '',
};

const RegistrationForm = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Maneja los cambios en los campos del formulario
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    /**
     * Valida todos los campos del formulario
     * @returns {boolean} true si el formulario es válido
     */
    const validateForm = () => {
        const newErrors = {};

        if (!validateRequired(formData.fullName)) {
            newErrors.fullName = 'El nombre completo es requerido';
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
        }

        if (!validateRequired(formData.email)) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'El formato del correo electrónico no es válido';
        }

        if (!validateRequired(formData.password)) {
            newErrors.password = 'La contraseña es requerida';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Reinicia el formulario a su estado inicial
     */
    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
        setErrors({});
    };

    /**
     * Maneja el envío del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await registerUser({
                full_name: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });

            // Registro exitoso
            setStatus({
                type: 'success',
                message: getErrorMessage(201, response.message),
            });
            setIsModalOpen(true);
            resetForm();
        } catch (error) {
            // Manejo de errores
            const errorMessage = getErrorMessage(error.status);

            setStatus({
                type: 'error',
                message: errorMessage,
            });
            setIsModalOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Cierra el modal de estado
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStatus({ type: '', message: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--bg-gradient-from))] to-[rgb(var(--bg-gradient-to))] px-4 py-12">
            <StatusModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                type={status.type}
                message={status.message}
            />

            <div className="w-full max-w-md">
                <div className="bg-[rgb(var(--bg-primary))] rounded-lg shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[rgb(var(--text-primary))] mb-2">
                            Crear cuenta
                        </h1>
                        <p className="text-[rgb(var(--text-secondary))]">
                            Regístrate para comenzar
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <FormInput
                            label="Nombre completo"
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            placeholder="Juan Pérez"
                            required
                            autoComplete="name"
                        />

                        <FormInput
                            label="Correo electrónico"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="tu@ejemplo.com"
                            required
                            autoComplete="email"
                        />

                        <FormInput
                            label="Contraseña"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="••••••••"
                            required
                            helperText="Mínimo 8 caracteres, una mayúscula y un número"
                            autoComplete="new-password"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[rgb(var(--color-primary))] text-white py-3 px-4 rounded-lg font-medium hover:bg-[rgb(var(--color-primary-hover))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registrando...
                                </span>
                            ) : (
                                'Registrarse'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-[rgb(var(--text-secondary))]">
                        ¿Ya tienes una cuenta?{' '}
                        <a
                            href="#"
                            className="text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-hover))] font-medium transition-colors"
                        >
                            Inicia sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;