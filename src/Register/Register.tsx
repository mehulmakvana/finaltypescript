import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { register } from "../actions/auth";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();

    const onChangeEmail = (e: any) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e: any) => {
        e.preventDefault();

        setSuccessful(false);

        dispatch(register(email, password))

    };

    return (
        
        <div className="col-md-12">
            <div className="card card-container">
                <h1>Register</h1>

                <form onSubmit={handleRegister} >
                    {!successful && (
                        <div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}

                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                                <Link to="/login">Login</Link>
                            </div>
                        </div>
                    )}


                </form>
            </div>
        </div>
    );
};

export default Register;