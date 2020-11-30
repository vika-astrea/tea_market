import React, { useContext } from "react";
import Axios from  "axios";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import UserContext from "../../context/UserContext";






export default function AddToCartButton(props) {
  const { userData } = useContext(UserContext);

  
  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const prodToAdd = { _id: props.buyerId, productId: props.id };
      await Axios({
        method: "put",
        url: "http://localhost:5000/user/addToCart",
        data: prodToAdd,
        headers: { "X-auth-token": userData.token },
      });
    } catch (err) {}
  };

  
 return(

  <Button
  variant="contained"
  color="primary"
  startIcon={<ShoppingCartIcon />}
  onClick={addToCart}
>
  Add to Cart
</Button>)

}
