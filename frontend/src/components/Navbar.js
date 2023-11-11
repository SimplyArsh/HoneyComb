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
                <Link to="/">
                    <h1>Navbar: Homepage</h1>
                </Link>
                <nav>
                    {user && ( // only display createProject and profile if logged in
                        <div>
                            <Link to="/createProject">
                                <h1>Create project</h1>
                            </Link>
                            <button onClick={handleClick}>Log out</button>
                            <Link to="/profile">
                                <h1>Profile</h1>
                            </Link>
                        </div>
                    )}
                    {!user && ( // only display signup and login if not logged in
                        <div>
                            <Link to="/signup">
                                <h1>Navbar: Sign up</h1>
                            </Link>
                            <Link to="/login">
                                <h1>Navbar: Login</h1>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar