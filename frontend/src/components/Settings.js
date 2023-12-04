import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/use-logout'
import { useSettingsContext } from "../hooks/use-settings-context"
import { useAuthContext } from '../hooks/use-auth-context';

export const Settings = () => {

    const settingsRef = useRef() // Create a ref for the settings component. This is to monitor if the user clicked outside of settings. If the user clicks outside, the settings tab should close
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const { visible, dispatch, settings } = useSettingsContext();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (visible && settingsRef.current && !settingsRef.current.contains(event.target)) {
                // Introduce a small delay to allow other click events to process first
                setTimeout(() => {
                    // Only dispatch if the menu is still visible
                    if (visible) {
                        dispatch({ type: 'SET_INVISIBLE' });
                    }
                }, 10); // A delay of 10ms is usually enough. This is to prevent the menu staying visible when clicking on the settings icon 
            }
        };

        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [visible, dispatch, settings]);

    const handleLogoutClick = () => {
        logout()
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked
    }

    const handleProfileClick = () => {
        navigate('/profile');
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked
    };

    const handleThemeClick = async () => {
        dispatch({ type: 'CHANGE_THEME' })
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked

        // Call API to update the post
        try {
            const response = await fetch('/api/user/settings', {
                headers: { // include token in header
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: JSON.stringify(settings),
                method: 'PATCH'
            })

            if (!response.ok) {
                console.log(response)
                return
            }

        } catch (error) {
            return error;
        }

    };

    const handleLanguageClick = async (language) => {
        dispatch({ type: 'SET_LANGUAGE', payload: language })
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked
        settings.language = language

        // Call API to update the post
        try {
            const response = await fetch('/api/user/settings', {
                headers: { // include token in header
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: JSON.stringify(settings),
                method: 'PATCH'
            })

            if (!response.ok) {
                console.log(response)
                return
            }
        } catch (error) {
            return error;
        }
    };

    const handleChangePasswordClick = () => {
        navigate('/changePassword');
    }

    return (
        visible && (
            <div className="settings-container">
                <div className="card" style={{ width: '18rem' }} ref={settingsRef}>
                    <div className="card-header" style={{ fontSize: 20 }} >
                        Settings
                    </div>
                    <ul className="list-group list-group-flush" >
                        <button className="btn btn-secondary" onClick={handleProfileClick}>Profile</button>
                        <button className="btn btn-secondary" onClick={handleThemeClick}>Change Theme</button>
                        {/* 
                        TODO LATER:
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                Language: {settings.language}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="dropdown-item" onClick={() => { handleLanguageClick('English') }}>English</button>
                                <button className="dropdown-item" onClick={() => { handleLanguageClick('Chinese') }} >Chinese</button>
                            </div>
                        </div>
                        */}
                        <button className="btn btn-secondary" onClick={handleChangePasswordClick}>Change password</button>
                        <button className="btn btn-secondary" onClick={handleLogoutClick}>Logout</button>
                    </ul>
                </div >
            </div >
        )
    )
}

export const SettingsIcon = () => {
    const { visible, dispatch } = useSettingsContext();


    const handleSettingsClick = () => {
        if (visible) {
            dispatch({ type: 'SET_INVISIBLE' });
        } else {
            dispatch({ type: 'SET_VISIBLE' });
        }
    };

    return <button className="material-symbols-outlined" onClick={handleSettingsClick}>settings</button>;
};