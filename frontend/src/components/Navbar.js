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
                    {user && ( // only display createProject and profile if user logged in
                        <div>
                            <div>
                                <Link to="/">
                                    <h1>Navbar: Homepage</h1>
                                </Link>
                            </div>
                            <Link to="/createProject">
                                <h1>Create project</h1>
                            </Link>
                            <button onClick={handleClick}>Log out</button>
                            <Link to="/profile">
                                <h1>Profile</h1>
                            </Link>
                        </div>
                    )}
                    {!user && ( // only display signup and login if user not logged in
                        <div>
                            <Link to="/signup">
                                <h1>Sign up</h1>
                            </Link>
                            <Link to="/login">
                                <h1>Login</h1>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar