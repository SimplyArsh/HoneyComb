import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/use-logout'
import { useAuthContext } from "../hooks/use-auth-context"


const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <nav>
                <div className="navbar-items-container">
                    {user && ( // only display createProject and profile if user logged in
                    <>
                        <div className="navbar-items-left">
                            <button className="btn custom-button">
                                <Link to="/">Home</Link>
                            </button>
                            <button className="btn custom-button">
                                <Link to="/createProject">Create</Link>
                            </button>
                        </div>
                        <h1>HoneyComb</h1>
                        <div className="navbar-items-right">
                            <button className="btn custom-button" onClick={handleClick}>Logout</button>
                            <button className="btn custom-button">
                                <Link to="/profile">Profile</Link>
                            </button>
                        </div>
                    </>
                    )}
                    {!user && ( // only display signup and login if user not logged in
                        <div className="navbar-items-right">
                            <button className="btn custom-button">
                                <Link to="/signup">Sign up</Link>
                            </button>
                            <button className="btn custom-button">
                                <Link to="/login">Login</Link>
                            </button>
                        </div>
                    )}
                     </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar