import axios from "axios";


export const GetAllProducts= async ()=>{
  try{
  const{data}= await axios.get("http://localhost:5000/products/all");
  return data}catch(err){}
}

export const GetUserProducts= async (key)=>{
  const{data}= await axios({
    method: "get",
    url: "http://localhost:5000/products/userProducts",
    headers: { "X-auth-token": key },
  });
  return data
}

export const RemoveFromCart = async(info)=>{
const{data}= await axios({
  method:"patch",
  url:"http://localhost:5000/user/removeFromCart",
  headers:{"X-auth-token":info.token},
  data:info
});
return data}

export const RemoveFromWishlist = async(info)=>{
  const{data}= await axios({
    method:"patch",
    url:"http://localhost:5000/user/removeFromWishlist",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data

}

export const DeleteProduct = async(info)=>{
  const {data} = await axios({
    method:"delete",
    url: "http://localhost:5000/products/deleteProduct",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data
}

export const UpdateProduct =  async(info)=>{
  const {data} = await axios({
    method:"patch",
    url: "http://localhost:5000/products/updateProduct",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data
}

export const ChangeUserName =  async(info)=>{
  const {data} = await axios({
    method:"patch",
    url: "http://localhost:5000/user/changeName",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data
}

export const ChangeUserEmail=  async(info)=>{
  const {data} = await axios({
    method:"patch",
    url: "http://localhost:5000/user/changeEmail",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data
}

export const ChangeUserPass=  async(info)=>{
  const {data} = await axios({
    method:"patch",
    url: "http://localhost:5000/user/changePassword",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data
}

export const DelUser=  async(info)=>{
  const {data} = await axios({
    method:"delete",
    url: "http://localhost:5000/user/deleteUser",
    headers:{"X-auth-token":info.token},
    data:info
  });
  return data
}

