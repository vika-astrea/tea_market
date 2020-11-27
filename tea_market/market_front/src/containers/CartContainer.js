import { Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import MediaCard from "../components/MediaCard";
import UserContext from "../context/UserContext";

export default function CartContainer() {
  const { userData } = useContext(UserContext);

  const cartIds = {
    _id: ["5fbc0aed02b4d6b01ba71d2e", "5fbd59115d72f31c30493830"],
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

  const { isLoading, error, data } = useQuery("repoData", GetCart);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data === undefined) return "wait a sec";

  return (
    <React.Fragment>
      <>
        <Typography variant="h3">My Cart</Typography>
        <div>
          {data.map((product, _id) => {
            return (
              <MediaCard
                key={product._id}
                name={product.name}
                type={product.type}
                img={product.img}
                amount={product.amount}
                price={product.price}
                vendor={product.vendor}
              />
            );
          })}
        </div>
      </>
    </React.Fragment>
  );
}
