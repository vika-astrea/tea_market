import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { useQuery } from "react-query";
import WishlistCard from "../components/WishlistCard";
import { GridList, makeStyles } from "@material-ui/core";
import  { Link}   from "react-router-dom";



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
          <br/>
          <br/>
          {userData.user.wishlist.length === 0 ? (  <Typography>
                {" "}
                Your Cart is empty!
                <Link to="/"> Browse our catalog and start 💗 now! </Link>
              </Typography>): ( <GridList cellHeight={180} className={classes.gridList}>
            {data.map((product, _id) => {
              return (
                <WishlistCard
                key={product._id}
                  product={product}
 
                  buyerId={userData.user.id}
                  token={userData.token}
                />
              );
            })}
          </GridList>)}
         
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
