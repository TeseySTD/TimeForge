import React, { useContext, useEffect } from 'react';
import Switch from '@/components/ui/Switch/Switch';
import ThemeContext from '@/contexts/ThemeContext';
import './ThemeToggle.scss';

interface Props {
    className?: string;
}

const ThemeToggle: React.FC<Props> = ({ className }) => {
    const { isDarkTheme: isDarkTheme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.documentElement.dataset.theme = isDarkTheme ? "dark" : "light";
    }, [isDarkTheme]);

    return (
        <div className={"theme-toggle " + className} title='Toggle theme'>
            <Switch
                switchEventHandler={toggleTheme}
                checked={!isDarkTheme}
                className="theme-switch"
            />
        </div>
    );
};

export default ThemeToggle;