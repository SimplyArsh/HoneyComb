// Navbar.js

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/use-auth-context";
import { Settings, SettingsIcon } from "./Settings";
import { Link } from 'react-router-dom';
import '../css-components/navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
    window.location.reload();
  };

  const handleCreateClick = () => {
    navigate('/createproject');
    window.location.reload();
  };

  const handleSignupClick = () => {
    navigate('/signup');
    window.location.reload();
  };

  const handleAboutClick = () => {
    navigate('/about');
    window.location.reload();
  };

  const handleLoginClick = () => {
    navigate('/login');
    window.location.reload();
  };

  return (
    <header>
      <div className="navbar navbar-expand-lg">
        <nav className="container">
          <div className="navbar-left">
          
           <img src={require('../favicon.ico')} alt="Logo" className="logo-img"/>
            <h1 className="navbar-logo">
              <Link to="/">HoneyComb</Link>
            </h1>
          </div>
          <div className="navbar-right">
            {user && (
              <>
                {/*<form className="d-flex" role="search">
                <input className="form-control me-2 search-input" type="search" style={{ width: '220px' }} placeholder="Search for projects..." aria-label="Search" />
                <button className="btn btn-secondary btn-outline-success" type="submit">Search</button>
            </form>*/}

                <button className="btn btn-secondary" onClick={handleHomeClick}>Home</button>
                <button className="btn btn-secondary" onClick={handleCreateClick}>Create</button>
                <button className="btn btn-secondary" onClick={handleAboutClick}>About</button>
                <SettingsIcon />
              </>
            )}
            {!user && (
              <>
                <div className="navbar-right">
                  <button className="btn btn-secondary" onClick={handleAboutClick}>About</button>
                  <button className="btn btn-secondary" onClick={handleSignupClick}>Sign Up</button>
                  <button className="btn btn-secondary" onClick={handleLoginClick}>Login</button>
                </div>
              </>
            )}
          </div>
        </nav>
        <hr className="hr" />

      </div>
      <Settings></Settings>
      <hr className="border-black opacity-100" />
    </header>
  );
}


export default Navbar;

<form className="d-flex" role="search">
  <input className="form-control me-2 search-input" type="search" style={{ width: '220px' }} placeholder="Search for projects..." aria-label="Search" />
  <button className="btn btn-secondary btn-outline-success" type="submit">Search</button>
</form>