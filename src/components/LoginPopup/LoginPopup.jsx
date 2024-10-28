import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import Cookies from "js-cookie";
import "./Loginstyles.css";

function Login() {
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const SubmitForm = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        
        if (values.username !== "" && values.password !== "") {
            axios.post("https://food-backend-2qo5.onrender.com/api/login", values)
                .then(res => {
                    if (res.status === 200 && res.data.jwt_token) {
                        // Set JWT token in cookies
                        Cookies.set("jwt_token", res.data.jwt_token, { expires: 7 }); // Token expires in 7 days
                        navigate("/home");
                    } else if (res.data.login_msg) {
                        alert(res.data.login_msg);
                    }
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        // Display the login message in the response if available
                        alert(err.response.data.login_msg || "Login failed. Please try again.");
                    } else {
                        console.error("Login error:", err);
                        alert("An error occurred. Please try again.");
                    }
                });
        }
    };

    return (
        <div className="backgroundCon">
            <div className="container">
                <h1 id="heading">Login</h1>
                <form action="" onSubmit={SubmitForm}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={handleInput} value={values.username} name="username" placeholder="Enter username" />
                        {errors.username && <p>{errors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={handleInput} value={values.password} name="password" placeholder="Enter password" />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit">Login</button>
                    <Link to="/" id="heading1"><button>Create Account</button></Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
