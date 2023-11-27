import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/use-auth-context"
import { useSettingsContext } from "../hooks/use-settings-context"
import { Settings, SettingsIcon } from "./Settings"


const Navbar = () => {

    const { user } = useAuthContext()
    const { visible } = useSettingsContext()
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
                                    <SettingsIcon></SettingsIcon>
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
            <Settings></Settings>
        </header>
    )
}

export default Navbar