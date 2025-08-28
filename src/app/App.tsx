import logo from '@/assets/logo.svg'
import './App.scss'
import Header from '@/components/index/Header/Header'
import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import Footer from '@/components/index/Footer/Footer';

function App() {
  const { isDarkTheme: isDarkTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? "dark" : "light";
  }, [isDarkTheme]);

  return (
    <>
      <Header toggleThemeHandler={toggleTheme} />
      <div>
        <a href="/" target="_blank">
          <img src={logo} className="logo" alt="TimeForge logo" />
        </a>
      </div>
      <h1>Time Forge - web app for time tracking.</h1>
      <Footer />
    </>
  )
}

export default App
