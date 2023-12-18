import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { authContext } from "../../context/authContext";
import "./login.css";


function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(authContext);
    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "loginStart" });
        try {
            const res = await axios.post("/auth/login", userCredential);
            dispatch({ type: "loginSuccess", payload: res.data });
        } catch (err) {
            dispatch({ type: "loginFailure", payload: err });
        }
    };
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    };
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginTitle">
                        Social Networking Application
                    </h3>
                    <span className="loginTagline">
                        Connect with users based on your personality type, interests, lifestyle, aspirations, and more!
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginInputBox" onSubmit={handleClick}>
                        <input className="loginInput" type="email" ref={email} placeholder="Email" required/>
                        <input className="loginInput" type="password" ref={password} placeholder="Password" required minLength="8"/>
                        <button className="loginButton">{isFetching ? <CircularProgress color="white"/> : "Login"}</button>
                        <Link to={"/signUp"} style={{ textDecoration: "none" }}>
                            <div className="loginSignUpLink">Create a new account</div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;