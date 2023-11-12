import './App.css';

// Routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages & components

import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/Sign-Up'
import CreateProject from './views/Create-Project'
import Profile from './views/Profile'
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/use-auth-context'

function App() {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div></div>; // loading
  }

  return (
    <div className="App">
      <BrowserRouter>
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;
