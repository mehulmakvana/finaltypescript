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
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};