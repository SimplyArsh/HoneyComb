import './App.css';

// Routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages & components

import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/Sign-Up'
import RequestResetPassword from './views/Pass-Request-Reset'
import ResetPassword from './views/Pass-Reset'
import CreateProject from './views/Create-Project'
import Profile from './views/Profile'
import PageNotFound from './views/Page-Not-Found'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/use-auth-context'
import { useSettingsContext } from "./hooks/use-settings-context"

function App() {
  const { user, loading } = useAuthContext()
  const { visible } = useSettingsContext();

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
                path='/pageNotFound'
                element={<PageNotFound />}  //Allow user to reset password reset even if not logged in
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
