import React, { useContext, useEffect } from 'react';
import Switch from '@/components/ui/Switch/Switch';
import ThemeContext from '@/contexts/ThemeContext';
import './ThemeToggle.scss';
import { useThrottling } from '@/hooks/useThrottling';

interface Props {
    className?: string;
}

const ThemeToggle: React.FC<Props> = ({ className }) => {
    const { isDarkTheme: isDarkTheme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.documentElement.dataset.theme = isDarkTheme ? "dark" : "light";
    }, [isDarkTheme]);

    const debouncedToggleTheme = useThrottling(toggleTheme);

    return (
        <div className={`theme-toggle ${className || ""}`} title='Toggle theme'>
            <Switch
                switchEventHandler={debouncedToggleTheme}
                checked={!isDarkTheme}
                className="theme-switch"
            />
        </div>
    );
};

export default ThemeToggle;