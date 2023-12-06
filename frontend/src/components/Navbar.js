// import { useNavigate } from 'react-router-dom'
// import { useAuthContext } from "../hooks/use-auth-context"
// import { Settings, SettingsIcon } from "./Settings"
// import '../css-components/navbar.css';

// const Navbar = () => {

//     const { user } = useAuthContext()
//     const navigate = useNavigate();

//     const handleHomeClick = () => {
//         navigate('/');
//     };

//     const handleCreateClick = () => {
//         navigate('/createproject');
//     };

//     const handleSignupClick = () => {
//         navigate('/signup');
//     };

//     const handleLoginClick = () => {
//         navigate('/login');
//     };

//     return (
//         <header>
//             <div className="container">
//                 <nav>
//                     <div className="navbar-items-container">
//                         {user && ( // only display createProject and profile if user logged in
//                             <>
//                                 <div className="navbar-items-left">
//                                     <button className="btn btn-secondary" onClick={handleHomeClick}>Home</button>
//                                     <button className="btn btn-secondary" onClick={handleCreateClick}>Create</button>
//                                 </div>
//                                 <h1 className="navbar-logo"> HoneyComb</h1>
//                                 <div className="navbar-items-right">
//                                     <SettingsIcon></SettingsIcon>
//                                 </div>
//                             </>
//                         )}
//                         {!user && ( // only display signup and login if user not logged in
//                             <div className="navbar-items-right">
//                                 <button className="btn btn-secondary" onClick={handleSignupClick}>Signup</button>
//                                 <button className="btn btn-secondary" onClick={handleLoginClick}>Login</button>
//                             </div>
//                         )}
//                     </div>
//                 </nav>
//             </div>
//             <Settings></Settings>
//         </header>
//     )
// }

// export default Navbar







// Navbar.js

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/use-auth-context";
import { Settings, SettingsIcon } from "./Settings";
import '../css-components/navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCreateClick = () => {
    navigate('/createproject');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };


  return (
    <header>
      <div className="navbar navbar-expand-lg">
        <nav className="container">
          <div className="navbar-left">
            <h1 className="navbar-logo">HoneyComb</h1>
          </div>
          <div className="navbar-right">
            {user && (
              <>
                <form className="d-flex" role="search">
                  <input className="form-control me-2 search-input" type="search" style={{ width: '220px' }} placeholder="Search for projects..." aria-label="Search" />
                  <button className="btn btn-secondary btn-outline-success" type="submit">Search</button>
                </form>

                <button className="btn btn-secondary" onClick={handleHomeClick}>Home</button>
                <button className="btn btn-secondary" onClick={handleCreateClick}>Create</button>
                <SettingsIcon />
              </>
            )}
            {!user && (
              <>
                <div className="navbar-right">
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



    /* <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
    
        <a class="navbar-brand" href="#">Left Element</a>
    
    
        <div class="ml-auto">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Right Element</a>
            </li>
          </ul>
        </div>
      </div>
    </nav> */
  );
}


export default Navbar;

