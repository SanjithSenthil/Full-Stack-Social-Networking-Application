import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./register.css"


function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== confirmPassword.current.value) {
            confirmPassword.current.setCustomValidity("The Password does not match");
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                await axios.post("/auth/register",user);
                history.push("/login");
            } catch (err) {

            }
        }
    };
    return (
        <div className="signUp">
            <div className="signUpWrapper">
                <div className="signUpLeft">
                    <h3 className="signUpTitle">
                        Social Networking Application
                    </h3>
                    <span className="signUpTagline">
                        Connect with users based on your personality type, interests, lifestyle, aspirations, and more!
                    </span>
                </div>
                <div className="signUpRight">
                    <form className="signUpInputBox" onSubmit={handleClick}>
                        <input className="signUpInput" type="username" ref={username} placeholder="Username" required minLength="3"/>
                        <input className="signUpInput" type="email" ref={email} placeholder="Email" required/>
                        <input className="signUpInput" type="password" ref={password} placeholder="Password" required minLength="8"/>
                        <input className="signUpInput" type="password" ref={confirmPassword} placeholder="Confirm Password" required minLength="8"/>
                        <button className="signUpButton" type="submit">Sign Up</button>
                        <Link to={"/login"} style={{ textDecoration: "none" }}>
                            <div className="signUpLoginLink">Login</div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;