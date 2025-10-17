import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
});

/**
 * Hook para acceder al contexto de tema
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe ser usado dentro de ThemeProvider');
    }
    return context;
};

/**
 * Proveedor del contexto de tema
 * Maneja el tema claro/oscuro de la aplicación
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Intentar obtener el tema guardado o usar el del sistema
        const savedTheme = localStorage?.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    // Aplicar el tema al documento
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);

        // Guardar preferencia
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('No se pudo guardar la preferencia de tema:', error);
        }
    }, [theme]);

    // Escuchar cambios en la preferencia del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            const savedTheme = localStorage?.getItem('theme');
            // Solo actualizar si no hay preferencia guardada
            if (!savedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};