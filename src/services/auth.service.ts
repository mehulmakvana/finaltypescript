import axios from "axios";

const API_URL = "https://rails-to-do-list-narola.herokuapp.com/v1/";

const register = (email?:string, password?:string) => {
  return axios.post(API_URL + "signup", {
    
    email,
    password,
    
  })
      
};

const login = (email?:string, password?:string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
   
        localStorage.setItem("auth_token", response.data.data.auth_token);

      return response.data;
    });
};



const logout = () => {
  localStorage.removeItem("auth_token");
};

export default {
  register,
  login,

  logout,
};