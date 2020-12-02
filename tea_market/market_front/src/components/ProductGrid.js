import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import AddToCartButton from "./buttons/AddToCartButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ProductGrid(props) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [listed, setListed] = useState(false);


  const addToWishlist = async (e) => {
    e.preventDefault();
    try {
      const prodToAdd = { _id: props.buyerId, productId: props.id };
      await Axios({
        method: "put",
        url: "http://localhost:5000/user/addToWishlist",
        data: prodToAdd,
        headers: { "X-auth-token": userData.token },
      });
    } catch (err) {}
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid itm xs={12}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<ArrowBackIcon />}
            onClick={(e) => {
              props.setName("");
              props.setVendor("");
              props.setPrice("");
              props.setImg("");
              props.setType("");
              props.setMaterial("");
              props.setAmount("");
              props.setId("");
              props.setBuyerId("");
            }}
          >
            Back to catalog
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img
            src={props.img}
            className={classes.media}
            alt="product on sale"
          />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h4" component="h1">
              {props.name}
            </Typography>
            <Typography variant="h5">
              {props.type} ({props.material})
            </Typography>
            <Typography variant="h8">by {props.vendor}</Typography>
            <br />
            <br />
            <Typography variant="h4">
              ${props.price} for {props.amount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          {" "}
          <AddToCartButton buyerId={props.buyerId}  id={props.id}/>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant={listed ? "contained" : "outlined"}
            color="secondary"
            className={classes.button}
            startIcon={<FavoriteBorderIcon />}
            onClick={(e) => {
              setListed(true);
              addToWishlist(e);
            }}
          >
            {listed ? "Added to your Wishlist!" : "Add to Wishlist"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
