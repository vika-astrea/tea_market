import axios from "axios";

export const GetAllProducts= async ()=>{
  const{data}= await axios.get("http://localhost:5000/products/all");
  return data
}