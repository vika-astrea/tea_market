import {
  Button,
  Divider, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";

export default function CartContainer() {
  const { userData } = useContext(UserContext);

  const cartIds = {
    _id: userData.user.cart,
  };

  let cartData = JSON.stringify(cartIds);

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

  const { isLoading, error, data } = useQuery("repoData", GetCart);

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
          <div className={classes.demo}>
            <List dense={dense}>
              {data.map((product, _id) => {
                return (
                  <ListItem key={product._id}>
                    <ListItemAvatar>
                      <CheckCircleIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={
                        secondary ? "Secondary text" : `$ ${product.price}`
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="remove">
                        <HighlightOffIcon color="secondary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <br />

            <Typography variant="h4">Total : $ {totalPrice}</Typography>
            <br />

            <Button variant="contained" color="primary">
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
