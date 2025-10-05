import { createContext } from "react";

interface ContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  setTheme: (isDarkTheme: boolean) => void;
}

const ThemeContext = createContext<ContextProps>({
  isDarkTheme: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

export default ThemeContext;

