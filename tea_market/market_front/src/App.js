import "./App.css";
import ClippedDrawer from "./components/ClippedDrawer";
import UserContext from "./context/UserContext";
import ProductContext from "./context/ProductContext"
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState({
    isLoggedIn:false,
    isLoading:true,
    token: undefined,
    user: "",
  });

  const [productId, setProductId]= useState("")

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({ token, user: userRes.data, isLoggedIn: true,
          isLoading: false });
         }
    };    
    checkLoggedIn();
  }, []);

  return (
    <ProductContext.Provider value={{productId, setProductId}}>
    <UserContext.Provider value={{ userData, setUserData }}>
      <div className="App">
        <ClippedDrawer />
      </div>
    </UserContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
