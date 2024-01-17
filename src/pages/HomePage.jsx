import Design from "../components/Design2";
const HomePage = () => {
    const login = () =>{
        window.location.href='/login';
    }
    const register = () =>{
        window.location.href='/register';
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