import React, { useEffect } from "react";
import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import "../css-components/dark-mode.css";
import { useSettingsContext } from "../hooks/use-settings-context"
import { useAuthContext } from "../hooks/use-auth-context"

const DarkMode = () => {
    const { dispatch, settings } = useSettingsContext();
    const { user } = useAuthContext();

    const setDarkMode = () => {
        console.log("dark!")
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    const setLightMode = () => {
        console.log("light!")
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }

    // Separate useEffect for setting theme on component mount or when settings change
    useEffect(() => {
        if (settings.theme === 'light') {
            console.log("new theme light!")
            setLightMode();
        } else if (settings.theme === 'dark') {
            console.log("new theme dark!")
            setDarkMode();
        }
    }, [settings.theme]);

    const updateThemeSettings = async (theme) => {

        dispatch({ type: 'SET_THEME', payload: theme });
        console.log(theme)

        try {
            const response = await fetch('/api/user/settings', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: JSON.stringify({ ...settings, theme }), // Ensure to send the updated theme
                method: 'PATCH'
            });

            if (!response.ok) {
                console.log(response);
                return;
            }
        } catch (error) {
            return error;
        }
    };

    const toggleTheme = async (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        if (newTheme === 'dark') {
            setDarkMode();
        } else {
            setLightMode();
        }
        updateThemeSettings(newTheme);
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={settings.theme === 'dark'}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;