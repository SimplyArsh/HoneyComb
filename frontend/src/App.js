import './App.css';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages & components

import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/Sign-Up'
import CreateProject from './views/Create-Project'
import Profile from './views/Profile'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="views">
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<SignUp />}
            />
            <Route
              path='/createProject'
              element={<CreateProject />}
            />
            <Route
              path='/profile'
              element={<Profile />} // view user's own profile
            />
            <Route
              path='/profile/:id' // view a specific profile
              element={<Profile />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;
