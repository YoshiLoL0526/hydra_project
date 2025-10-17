import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

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