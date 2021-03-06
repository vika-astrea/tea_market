import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import RemoveCartButton from "../components/buttons/RemoveCartButton";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";



export default function CartContainer() {
  const { userData } = useContext(UserContext);
  const { setProductId } = useContext(ProductContext);

  let history = useHistory();

  const cartIds = {
    _id: userData.user.cart,
  };

  let cartData = JSON.stringify(cartIds);

  function handleEnd() {
    history.push("/end");
  }

  //Style
  const [dense] = useState(false);
  const [secondary] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  const classes = useStyles();

  //Query
  let config = {
    method: "post",
    url: "http://localhost:5000/products/cartProducts",
    headers: {
      "x-auth-token": userData.token,
      "Content-Type": "application/json",
    },
    data: cartData,
  };

  const GetCart = async () => {
    const { data } = await axios(config);
    return data;
  };

  const { isLoading, error, data } = useQuery("cart", GetCart);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data === undefined) return "wait a sec";

  let priceArray = data.map((product) => {
    return product.price;
  });

  let totalPrice = priceArray.reduce((a, b) => a + b, 0);

  return (
    <React.Fragment>
      {userData.isLoggedIn ? (
        <>
          <Typography variant="h3">My Cart</Typography>
          <br />

          <div className={classes.demo}>
            {userData.user.cart.length === 0 ? (
              <Typography>
                {" "}
                Your Cart is empty!
                <Link to="/"> Browse our catalog and start buying now! </Link>
              </Typography>
            ) : (
              <List dense={dense}>
                {data.map((product, _id) => {
                  return (
                    <ListItem key={product._id}
                    button="true"
                    onClick={(e) => {
                      setProductId(product._id);
                      history.push("/product");
                    }}>
                      <ListItemAvatar>
                        <CheckCircleIcon color="primary" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${product.name} - by ${product.vendor}`}
                        secondary={
                          secondary ? "Secondary text" : `$ ${product.price}`
                        }
                      />
                      <ListItemSecondaryAction>
                        <RemoveCartButton
                          productId={product._id}
                          _id={userData.user.id}
                          token={userData.token}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            )}

            <Divider />
            <br />

            <Typography variant="h4">Total : $ {totalPrice}</Typography>
            <br />

            <Button variant="contained" color="primary" onClick={handleEnd}>
              Go to Check Out
            </Button>
          </div>
        </>
      ) : userData.isLoading ? (
        "Loading..."
      ) : (
        <NotLogged />
      )}
    </React.Fragment>
  );
}
