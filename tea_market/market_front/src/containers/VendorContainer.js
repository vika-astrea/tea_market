import React, { useContext } from "react";
import VendorContext from "../context/VendorContext";
import { GridList } from "@material-ui/core";
import Axios from "axios";
import { useQuery } from "react-query";
import MediaCard from "../components/MediaCard";
import StoreName from "../components/StoreName";

export default function VendorContainer() {
  const { vendorId } = useContext(VendorContext);

  //Query

  let config = {
    method: "post",
    url: "http://localhost:5000/products/vendorProducts",
    data: { userId: vendorId },
  };

  const GetStore = async () => {
    const { data } = await Axios(config);
    return data;
  };

  const { isLoading, error, data } = useQuery("store", GetStore);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data === undefined) return "wait a sec";

  return (
    <>
      <StoreName />

      <GridList cellHeight={180}>
        {data.map((product, _id) => {
          return (
            <MediaCard
              key={_id}
              i={_id}
              product={product}
              img={product.img}
              name={product.name}
              vendor={product.vendor}
              type={product.type}
              material={product.material}
              price={product.price}
              amount={product.amount}
              id={product._id}
            />
          );
        })}
      </GridList>
    </>
  );
}
