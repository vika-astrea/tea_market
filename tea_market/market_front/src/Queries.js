import axios from "axios";

export const GetAllProducts= async ()=>{
  const{data}= await axios.get("http://localhost:5000/products/all");
  return data
}

export const GetUserProducts= async (key)=>{
  const{data}= await axios({
    method: "get",
    url: "http://localhost:5000/products/userProducts",
    headers: { "X-auth-token": key },
  });
  return data
}

