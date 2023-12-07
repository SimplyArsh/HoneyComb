import { useState } from "react"
import { useSignup } from '../hooks/use-signup'
import '../css-components/sign-up.css'

function AvatarButton({ isHighlighted, value, onSquareClick }) {
    // return (
    //     <button className="square" onClick={onSquareClick}>
    //     {value}
    //     </button>
    // );
    let avatarNumber = null
    switch(value) {
        case "1":
            avatarNumber = require('../assets/i1.jpeg');
            break;
        case "2":
            avatarNumber = require(`../assets/i2.jpeg`);
            break;
        case "3":
            avatarNumber = require(`../assets/i3.jpeg`);
            break;
        case "4":
            avatarNumber = require(`../assets/i4.jpeg`);
            break;
        case "5":
            avatarNumber = require(`../assets/i5.jpeg`);
            break;
        case "6":
            avatarNumber = require(`../assets/i6.jpeg`);
            break;
    }  

    return(<button type="button"
      className={`avatar-button ${isHighlighted ? 'highlighted' : ''}`} style={{padding: 5, "backgroundColor": "transparent"}}
      onClick={onSquareClick}
    >
      <img style={{ width: 100, height: 100 }} src={avatarNumber} />
    </button>)
}

const SignUp = () => {
    // const { token, dispatch } = useUserContext()
    // const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const { signup, error, isLoading } = useSignup()
    const [avatarNumber, setAvatarNumber] = useState()
    const [isHighlighted, setIsHighlighted] = useState(Array(6).fill(0));

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        await signup(username, email, password, aboutMe, avatarNumber)
    }

    const handleCLick = (i) => {
        setAvatarNumber(i)
        console.log(avatarNumber)
        const isHighlightedCopy = Array(6).fill(0)
        isHighlightedCopy[i] = 1
        setIsHighlighted(isHighlightedCopy)
    }

    return (
        <div className="signUp">
            <div className="spacer"></div>
            <h1>Sign up</h1>
            <div className="spacer"></div>
            <div className="container mt-6">
                <div className="card">
                    <form className="create" onSubmit={handleSubmit}>
                        <div className="spacer"></div>
                        <label>Username:</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <label>Email:</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <label>About me:</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setAboutMe(e.target.value)
                            }}
                        />
                        <label>Choose your avatar!</label>
                        <div className="avatar-row">
                            <AvatarButton value="1" onSquareClick={() => handleCLick(0)} />
                            <AvatarButton value="2" onSquareClick={() => handleCLick(1)} />
                            <AvatarButton value="3" onSquareClick={() => handleCLick(2)} />
                        </div>
                        <div className="avatar-row">
                            <AvatarButton value="4" onSquareClick={() => handleCLick(3)} />
                            <AvatarButton value="5" onSquareClick={() => handleCLick(4)} />
                            <AvatarButton value="6" onSquareClick={() => handleCLick(5)} />
                        </div>
                        
                        <button className="btn submit-button" disabled={isLoading}>Sign up</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                    <div className="spacer"></div>
                </div>
            </div>
            <div className="very-long-spacer"></div>
                

        </div>
    )
}

export default SignUp