import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/user-context'
import { AuthContextProvider } from './context/auth-context'
import { HomeContextProvider } from './context/home-context'
import { ProfileContextProvider } from './context/profile-context'
import { SettingsContextProvider } from './context/settings-context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <ProfileContextProvider>
          <SettingsContextProvider>
            <HomeContextProvider>
              <App />
            </HomeContextProvider>
          </SettingsContextProvider>
        </ProfileContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
