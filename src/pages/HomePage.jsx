import Design from "../components/Design2";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
const HomePage = () => {
    const navigate = useNavigate();
    
    const login = () =>{
        navigate('/login');
    }
    const register = () =>{
        navigate('/register');
    }
    if(auth.currentUser){
        navigate("/chats");
    }
    return(
        <div className="desktopHome">
            <div className="desktopHomewrapper">
                <h1>Welcome to the AMAS Chat page!</h1>
                <button className="login" onClick={login}>Log in</button>
                <button className="register" onClick={register}>Register</button>
            </div>
            <Design />
        </div>
    )
}

export default HomePage;