import { useState } from "react";
import ThemeContext from "./ThemeContext";

interface Props {
  children?: React.ReactNode;
}


const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(true);

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme: isDarkTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;