import { createContext } from "react";

interface ContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextProps>({
  isDarkTheme: true,
  toggleTheme: () => {},
});

export default ThemeContext;

