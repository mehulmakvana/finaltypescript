export default function authHeader() {
  
  return { 'access-token': localStorage.getItem("auth_token") || '', };
}