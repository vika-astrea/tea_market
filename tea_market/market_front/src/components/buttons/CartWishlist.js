import React, { useContext } from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";


export default function CartWishlist(props) {
  const { userData } = useContext(UserContext);
 let history = useHistory();

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const prodToAdd = { _id: userData.user.id, productId: props.id };
      await Axios({
        method: "put",
        url: "http://localhost:5000/user/addToCart",
        data: prodToAdd,
        headers: { "X-auth-token": userData.token },
      });
         } catch (err) {}
  };

  
  return (
    <>{userData.user.cart.includes(props.id) ? (        <Button
      variant="outlined"
      color="primary"
      startIcon={<ShoppingCartIcon />}
      onClick={(e)=>history.push("/cart")}
    >
      On your cart! 
    </Button>):(        <Button
      variant="contained"
      color="primary"
      startIcon={<ShoppingCartIcon />}
      onClick={addToCart}
    >
      Add to Cart
    </Button>)}

    </>
  );
}
