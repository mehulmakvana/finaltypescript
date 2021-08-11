import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Loginpage extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
           email : null,
           password : null
         }
     }

    handleChange = (event : any) => {}
    handleSubmit = (event : any) => {}

    render() {
        return (
            <div className='form-wrapper'>
                <h1>Login</h1>
                <h1>register</h1>
                 <form onSubmit={this.handleSubmit} noValidate >
                 <div className='email'>
                  <label htmlFor="email">Email</label>
                  <input type='email' name='email' onChange={this.handleChange}/>
               </div>
               <div className='password'>
                  <label htmlFor="password">Password</label>
                  <input type='password' name='password' onChange={this.handleChange}/>
               </div>   
               <div className='submit'>
                  <button>Login</button>
                  <Link to="/register">Register</Link>
               </div>
               </form>
            </div>
        )
    }
}

export default Loginpage;