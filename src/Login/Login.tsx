import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { Link } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const onChangeEmail = (e: any) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

  dispatch(login(email, password))

  }

  return (

    <div className="col-md-12">
      <h1>Login</h1>
      <div className="card card-container">
       

        <form onSubmit={handleLogin} >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
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
            <button className="btn btn-primary btn-block" >

              <span>Login</span>
            </button>
            <Link to="/">Register</Link>

          </div>


        </form>
      </div>
    </div>
  );

};

export default Login;