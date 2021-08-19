import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://rails-to-do-list-narola.herokuapp.com/v1/todos?limit=10&offset=0&sort_by=id&sort_direction=asc";



const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getAddData= () => {
  return axios.get(API_URL, { headers: authHeader() });
};

// const getAddDataDsc= () => {
//   return axios.get(API_URL_D, { headers: authHeader() });
// };

const deleteData = (id:any) => {
  return axios.delete(`https://rails-to-do-list-narola.herokuapp.com/v1/todos/${id}` , { headers: authHeader() });
};

const SortData =(sort_by: string = 'id', sort_direction: string = 'asc') => {
  return axios.get(`https://rails-to-do-list-narola.herokuapp.com/v1/todos?limit=10&offset=0&sort_by=${sort_by}&sort_direction=${sort_direction}` ,{headers: authHeader()})
}

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() }); 
};
export default {
  getPublicContent,
  getAddData,
  deleteData,
  getAdminBoard,
  SortData,
  //getAddDataDsc
};