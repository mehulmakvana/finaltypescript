import React, { useState } from "react";
import { Link } from 'react-router-dom';


export default function Signup() {

  const [state, setState] = useState({ loading: false });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginForm() {

    setState({ ...state, loading: true });
    const response = await fetch(`https://rails-to-do-list-narola.herokuapp.com/v1/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });
    const content = await response.json();
    setState({ ...state, loading: false });
    console.log(content);
  }


  return (
            <div>

              <h1>Login</h1>
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


      <button className="btn-join" onClick={loginForm}>

      </button>
      <Link to="/">Register</Link>
    </div>
  )
}
