import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
    LOGOUT, 
    SET_MESSAGE,
  } from "./types";
  
  import {history} from '../helpers/history'

  import AuthService from "../services/auth.service";

  
  export const register = ( email?:string, password?:string) => (dispatch:any) => {
    return AuthService.register( email, password).then(
      (response) => {
      
        dispatch({
          type: REGISTER_SUCCESS,

        });
        history.push('/login');
       
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
  
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (email?:string, password?:string) => (dispatch:any) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        history.push('/data');
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch:any) => {
    AuthService.logout();
    history.push('/login');
    dispatch({
      type: LOGOUT,
    });
  };