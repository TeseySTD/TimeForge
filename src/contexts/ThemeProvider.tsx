import { useState } from "react";
import ThemeContext from "./ThemeContext";
import { getThemeSetting } from "@/utils/settingsUtils";

interface Props {
  children?: React.ReactNode;
}


const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(getThemeSetting());

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme: isDarkTheme,
        toggleTheme: toggleThemeHandler,
        setTheme: setDarkTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;