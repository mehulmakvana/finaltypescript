import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface RegisterPageProps {
    name?: string;
    value?: string;
    submitting: any;
    history?: any

}
// interface Fields {
//     email?: string,
//     password?: string,
//     confirmpassword?: string
// }
interface RegisterPageState {
    submitted?: Boolean;
    // user?: Fields;
    email:string;
    password:string;
    confirmpassword:string;
 
}
class RegisterPage extends Component<RegisterPageProps, RegisterPageState>{
    constructor(props: RegisterPageProps) {
        super(props);
        this.state = {
       
                email: '',
                password: '',
                confirmpassword: '',
            
            submitted: false
        }


    }
    // handleChange = (event: any) => {
    //     this.setState({
    //         user: {
    //             ...this.state.user,
    //             [event?.target.name]: event?.target.value
    //         }
    //     });
    // }

    handleChange(e:any) {
        const { name, value } = e.target;
        this.setState({ 
            
            ...name,
            [e.target.name]: value });
    }

    onFormSubmit=(user:any)=>{
        console.log(user);
  
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("confirmpassword", user.confirmpassword);
  
          const options = {
              method: 'POST',
              body: formData
          };
  
        try{
          fetch('https://rails-to-do-list-narola.herokuapp.com/v1/signup', options).then(() => {
            this.props.history.push('/login')
          });
        }
  
        catch (error) {
          alert('Login Failed. Try Again')
        }
  
      };

    Path(path: any) {
        this.props.history.push(path)
    }

    render() {
        const { email, password,confirmpassword  } = this.state;        
        return (
            <div>
                <div>
                    <h1>Registartion</h1>
                    <div>
                        <form >
                            <div className='Email ID'>
                                <label >Email ID</label>
                                <input type='text' name='email' value={email} onChange={this.handleChange} />
                            </div>
                            <div className='Password'>
                                <label >Password</label>
                                <input type='text' name='password' value={password} onChange={this.handleChange} />
                            </div>

                            <div className='Confirm Password'>
                                <label >Confirm Password</label>
                                <input type='password' name='confirmpassword' value={confirmpassword} onChange={this.handleChange} />
                            </div>

                            <div className='ui button'>
                                <button onClick={this.onFormSubmit}>Register</button>
                                <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage;