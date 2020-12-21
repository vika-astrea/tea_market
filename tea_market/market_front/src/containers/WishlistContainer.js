import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { useQuery } from "react-query";
import WishlistCard from "../components/WishlistCard";
import { GridList, makeStyles } from "@material-ui/core";

export default function WishlistContainer() {
  const { userData } = useContext(UserContext);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      margin: "10px",
    },
    gridList: {
      justifyItems: "center",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    },
  }));

  const wishlistIds = {
    _id: userData.user.wishlist,
  };

  let wishlistData = JSON.stringify(wishlistIds);

  let config = {
    method: "post",
    url: "http://localhost:5000/products/wishlistProducts",
    headers: {
      "x-auth-token": userData.token,
      "Content-Type": "application/json",
    },
    data: wishlistData,
  };

  const GetWishlist = async () => {
    const { data } = await Axios(config);
    return data;
  };

  const classes = useStyles();

  const { isLoading, error, data } = useQuery("wish", GetWishlist);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data === undefined) return "wait a sec";

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">My Wishlist</Typography>
          <GridList cellHeight={180} className={classes.gridList}>
            {data.map((product, _id) => {
              return (
                <WishlistCard
                  name={product.name}
                  img={product.img}
                  product={product}
                  vendor={product.vendor}
                  type={product.type}
                  material={product.material}
                  price={product.price}
                  amount={product.amount}
                  id={product._id}
                  buyerId={userData.user.id}
                  token={userData.token}
                />
              );
            })}
          </GridList>
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
