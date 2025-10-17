import ThemeToggle from './components/common/ThemeToggle';
import RegistrationForm from './components/forms/RegistrationForm';
import { ThemeProvider } from './context/ThemeProvider';

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <RegistrationForm />
    </ThemeProvider>
  );
}

export default App;