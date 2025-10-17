import PropTypes from 'prop-types';

/**
 * Componente de input reutilizable para formularios
 */
const FormInput = ({
    label,
    type = 'text',
    id,
    name,
    value,
    onChange,
    error,
    placeholder,
    required = false,
    helperText,
    autoComplete,
}) => {
    const inputClasses = `
    w-full px-4 py-2 
    border rounded-lg 
    bg-[rgb(var(--bg-primary))] 
    text-[rgb(var(--text-primary))]
    focus:ring-2 focus:ring-[rgb(var(--color-primary))] 
    focus:border-[rgb(var(--color-primary))] 
    outline-none 
    transition-all duration-200
    ${error
            ? 'border-[rgb(var(--border-error))] focus:ring-[rgb(var(--color-error))] focus:border-[rgb(var(--color-error))]'
            : 'border-[rgb(var(--border-default))]'
        }
  `;

    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-2"
            >
                {label}
                {required && <span className="text-[rgb(var(--color-error))] ml-1" aria-label="requerido">*</span>}
            </label>

            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className={inputClasses}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : helperText
                            ? `${id}-helper`
                            : undefined
                }
            />

            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-sm text-[rgb(var(--color-error-text))] animate-slideDown"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {helperText && !error && (
                <p
                    id={`${id}-helper`}
                    className="mt-1.5 text-sm text-[rgb(var(--text-muted))]"
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    helperText: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default FormInput;