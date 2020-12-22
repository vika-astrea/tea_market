import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useQuery, useMutation } from "react-query";
import AddToCartButton from "../components/buttons/AddToCartButton";
import { useHistory } from "react-router-dom";
import { RemoveFromWishlist } from "../Queries";

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

export default function UniqueProductContainer(props) {
  const classes = useStyles();
  let history = useHistory();
  const { userData } = useContext(UserContext);
  const [mutate] = useMutation(RemoveFromWishlist);

  const addToWishlist = async (e) => {
    e.preventDefault();
    try {
      const prodToAdd = { _id: userData.user.id, productId: props.id };
      await axios({
        method: "put",
        url: "http://localhost:5000/user/addToWishlist",
        data: prodToAdd,
        headers: { "X-auth-token": userData.token },
      });
    } catch (err) {}
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: userData.user.id,
        productId: props.id,
        token: userData.token,
      });
    } catch (error) {}
  };

  //QUERY
  let config = {
    method: "post",
    url: "http://localhost:5000/products/product",
    data: { id: props.id },
  };

  const GetProduct = async () => {
    const { data } = await axios(config);
    return data;
  };

  const { isLoading, error, data } = useQuery("unique", GetProduct);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data === undefined) return "wait a sec";

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
              props.setType("");
              props.setId("");
              history.push("/home");
            }}
          >
            Back to catalog
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img src={data.img} className={classes.media} alt="product on sale" />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h4" component="h1">
              {data.name}
            </Typography>
            <Typography variant="h5">
              {data.type} ({data.material})
            </Typography>
            <Typography>by {data.vendor}</Typography>
            <br />
            <br />
            <Typography variant="h4">
              ${data.price} for {data.amount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          {" "}
          <AddToCartButton buyerId={userData.user.id} id={props.id} />
        </Grid>
        <Grid item xs={3}>
          {userData.user.wishlist.includes(props.id) ? (
            <Button
              variant={"outlined"}
              color="secondary"
              className={classes.button}
              startIcon={<FavoriteBorderIcon />}
              onClick={(e) => {
                handleRemove(e);
              }}
            >
              On your Wishlist!
            </Button>
          ) : (
            <Button
              variant={"contained"}
              color="secondary"
              className={classes.button}
              startIcon={<FavoriteBorderIcon />}
              onClick={(e) => {
                addToWishlist(e);
              }}
            >
              Add to Wishlist
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
