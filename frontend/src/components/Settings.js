import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/use-logout'
import { useSettingsContext } from "../hooks/use-settings-context"

export const Settings = () => {

    const settingsRef = useRef() // Create a ref for the settings component. This is to monitor if the user clicked outside of settings. If the user clicks outside, the settings tab should close
    const { logout } = useLogout()
    const navigate = useNavigate()

    const { visible, dispatch } = useSettingsContext();

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
    }, [visible, dispatch]);

    const handleLogoutClick = () => {
        logout()
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked
    }

    const handleProfileClick = () => {
        navigate('/profile');
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked
    };

    const handleDarkModeClick = () => {
        dispatch({ type: 'CHANGE_DARK_MODE' })
        dispatch({ type: 'SET_INVISIBLE' }) // close settings after button clicked
    };

    return (
        visible &&
        <div ref={settingsRef}> {/* Assign the ref to the div */}
            <button className="btn custom-button" onClick={handleLogoutClick}>Logout</button>
            <button className="btn custom-button" onClick={handleProfileClick}>Profile</button>
            <button className="btn custom-button" onClick={handleDarkModeClick}>Dark Mode</button>
        </div>
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