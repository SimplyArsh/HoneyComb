import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Navbar: Homepage</h1>
                </Link>
                <Link to="/signup">
                    <h1>Navbar: Sign up</h1>
                </Link>
                <Link to="/login">
                    <h1>Navbar: Login</h1>
                </Link>
                <Link to="/createProject">
                    <h1>Create project</h1>
                </Link>
                <Link to="/profile">
                    <h1>Profile</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar