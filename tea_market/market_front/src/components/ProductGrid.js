import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, {useContext} from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Axios from "axios"
import UserContext from "../context/UserContext";

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
              props.setBuyerId("")
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ShoppingCartIcon/>}
            onClick={addToCart}
            >
            Add to Cart
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            startIcon={<FavoriteBorderIcon />}
            
          >
            Add to Wishlist
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
