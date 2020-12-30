import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import UserContext from "../context/UserContext";
import { RemoveFromWishlist } from "../Queries";
import CartWishlist from "./buttons/CartWishlist";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 140,
  },
});

export default function WishlistCard(props) {
  const classes = useStyles();
  const { setProductId } = useContext(ProductContext);
  const { userData } = useContext(UserContext);

  let history = useHistory();

  const [mutate] = useMutation(RemoveFromWishlist);

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: props.buyerId,
        productId: props.product._id,
        token: props.token,
      });
    } catch (error) {}
  };

  return (
    <Card className={classes.root} key={props.product._id}>
      <CardActionArea
        onClick={(e) => {
          setProductId(props.product._id);
          history.push("/product");
        }}
      >
        <CardMedia
          className={classes.media}
          image={props.product.img}
          title={props.product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.product.type}, It comes in: {props.product.material}.
          </Typography>
          <br />
          <Typography gutterBottom variant="h5" component="h2">
            Price: $ {props.product.price} for {props.product.amount}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            by: {props.product.vendor}
          </Typography>
        </CardContent>
      </CardActionArea>
      {userData.user.cart.includes(props.product._id) ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={(e)=>{history.push("/cart")}}

        >
          {" "}
          On your cart!{" "}
        </Button>
      ) : (
        <CartWishlist id={props.product._id}/>
      )}
      <br />
      <br />

      <Button
        color="secondary"
        variant="outlined"
        startIcon={<HighlightOffIcon />}
        onClick={handleRemove}
      >
        Remove from Wishlist
      </Button>
      <br />
      <br />
    </Card>
  );
}
