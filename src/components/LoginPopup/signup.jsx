import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./signupValidation";
import axios from "axios";
import "./signupstyles.css";

function Signup() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const SubmitForm = (e) => {
        e.preventDefault();
        setErrors(Validation(values));

        if (values.username !== "" && values.email !== "" && values.password !== "") {
            axios.post("https://food-backend-2qo5.onrender.com/api/register", values)
                .then(res => {
                    // If the response indicates a user already exists, show an alert
                    if (res.data.register_msg === "User already exists") {
                        alert(res.data.register_msg);
                    } else {
                        navigate("/login"); // Redirect to login if successful
                    }
                })
                .catch(err => {
                    // Check if there's a response and handle accordingly
                    if (err.response) {
                        // Display the register message from the backend
                        alert(err.response.data.register_msg || "An error occurred during registration.");
                    } else {
                        // Handle the case where there is no response from the server
                        console.error("Registration error:", err);
                        alert("An error occurred. Please try again.");
                    }
                });
        }
    };

    return (
        <div className="backgroundCon">
            <div className="container">
                <h1 id="heading">Sign up</h1>
                <form onSubmit={SubmitForm}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={handleInput} value={values.username} name="username" placeholder="Enter username" />
                        {errors.username && <p>{errors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={handleInput} value={values.email} name="email" placeholder="Enter Email" />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={handleInput} value={values.password} name="password" placeholder="Enter Password" />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit">Sign Up</button>
                    <Link to="/login"><button>Login</button></Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
