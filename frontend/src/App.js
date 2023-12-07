import './App.css';

// Routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages & components

import Home from './views/Home'
import Search from './views/Search'
import Login from './views/Login'
import SignUp from './views/Sign-Up'
import RequestResetPassword from './views/Pass-Request-Reset'
import ResetPassword from './views/Pass-Reset'
import ResetPasswordLoggedIn from './views/Pass-Reset-Logged-In';
import CreateProject from './views/Create-Project'
import Profile from './views/Profile'
import About from './views/About'
import PageNotFound from './views/Page-Not-Found'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/use-auth-context'
import { useSettingsContext } from "./hooks/use-settings-context"
import { useEffect } from 'react'

function App() {
  const { user, loading } = useAuthContext()
  const { dispatch, visible } = useSettingsContext();

  useEffect(() => { // get settings when the app loads
    if (!user) { // don't do anything if the user is logged out
      dispatch({ type: 'SET_THEME', payload: 'light' }) // by default, color theme is light
      return
    }
    const fetchSettings = async () => {
      let response
      response = await fetch('/api/user/settings', {
        headers: { // include token in header
          'Authorization': 'Bearer ' + user.token
        }
      })


      const settingsResponse = await response.json() // get user info from server and update context

      dispatch({ type: 'SET_THEME', payload: settingsResponse.theme }) // update settings context

      // set theme
      const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
      }
      const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
      }
      if (settingsResponse.theme === 'light') {
        setLightMode();
      } else if (settingsResponse.theme === 'dark') {
        setDarkMode();
      }

      if (!response.ok) {
        return "Error"
      }
    }

    if (user) {
      fetchSettings()
    }

  }, [user, dispatch])

  if (loading) {
    return <div></div>; // loading
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className={visible ? "settings-overlay" : ""}> {/* When settings is open, the rest of the page should freeze*/}
          <Navbar />
          <div className="views">
            <Routes>
              <Route
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />} // if logged in, display homepage. If not logged in, display login page
              />
              <Route
                path='/search'
                element={user ? <Search /> : <Navigate to='/login' />} //if logged in redirect search results. If not send
              />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />} // if logged in, display homepage. If not logged in, display login page
              />
              <Route
                path='/signup'
                element={!user ? <SignUp /> : <Navigate to='/' />} // if logged in, display homepage. If not logged in, display signup page
              />
              <Route
                path='/requestResetPass'
                element={<RequestResetPassword />}  //Allow user to request password reset even if not logged in; future: maybe redirect to profile/settings page
              />
              <Route
                path='/resetPass'
                element={<ResetPassword />}  //Allow user to reset password reset even if not logged in
              />
              <Route
                path='/changePass'
                element={<ResetPasswordLoggedIn />}  //Allow user to reset password reset even if not logged in
              />
              <Route
                path='/createProject'
                element={user ? <CreateProject /> : <Navigate to='/login' />} // if logged in, display createProject page. If not logged in, display login

              />
              <Route
                path='/profile'
                element={user ? <Profile /> : <Navigate to='/login' />} // if logged in, display profile page. If not logged in, display login
              />
              <Route
                path='/profile/:id' // view a specific profile
                element={user ? <Profile /> : <Navigate to='/login' />} // if logged in, display profile page. If not logged in, display login
              />
              <Route
                path='/about'
                element={<About />}  
              />
              <Route
                path='/pageNotFound'
                element={<PageNotFound />}  
              />
              {/* Catch-all route */}
              <Route path='*' element={<Navigate to='/pageNotFound' />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;
