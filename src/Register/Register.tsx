import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Register() {

    const [state, setState] = useState({ loading: false });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    async function submitForm() {

      

        setState({ ...state, loading: true });
        const response = await fetch(`https://rails-to-do-list-narola.herokuapp.com/v1/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password, confirmpassword: confirmpassword })
        });
        
       
        const content = await response.json();
        setState({ ...state, loading: false });
        console.log(content);
       

      
    }



    return (
        <div>
            <h1>Register</h1>
            <div>
                <label>Email</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="input"
                    id="email"

                />
            </div>
            <div>
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    id="password"
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    value={confirmpassword}
                    onChange={e => setConfirmpassword(e.target.value)}
                    type="password"
                    id="password"
                />
            </div>
            <div>

                <button type="submit" className="btn-join" onClick={submitForm}>
                    Register
                </button>
                <Link to="/login">Login
                </Link>

            </div>

        </div>
    )
}
