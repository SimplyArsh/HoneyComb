import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/use-logout'
import { useAuthContext } from "../hooks/use-auth-context"


const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout()
    }

    const handleHomeClick = () => {
    navigate('/');
    };

    const handleCreateClick = () => {
        navigate('/createproject');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };



    return (
        <header>
            <div className="container">
                <nav>
                <div className="navbar-items-container">
                    {user && ( // only display createProject and profile if user logged in
                    <>
                        <div className="navbar-items-left">
                            <button className="btn custom-button" onClick={handleHomeClick}>Home</button>
                            <button className="btn custom-button" onClick={handleCreateClick}>Create</button>
                        </div>
                        <h1>HoneyComb</h1>
                        <div className="navbar-items-right">
                            <button className="btn custom-button" onClick={handleLogoutClick}>Logout</button>
                            <button className="btn custom-button" onClick={handleProfileClick}>Profile</button>
                        </div>
                    </>
                    )}
                    {!user && ( // only display signup and login if user not logged in
                        <div className="navbar-items-right">
                            <button className="btn custom-button" onClick={handleSignupClick}>Signup</button>
                            <button className="btn custom-button" onClick={handleLoginClick}>Login</button>
                        </div>
                    )}
                     </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar