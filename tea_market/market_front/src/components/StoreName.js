import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import VendorContext from "../context/VendorContext";
import { useQuery } from "react-query";
import Axios from "axios";

export default function StoreName() {
  const { vendorId } = useContext(VendorContext);

  //Query

  let config = {
    method: "post",
    url: "http://localhost:5000/user/vendorName",
    data: { userName: vendorId },
  };

  const GetVendorName = async () => {
    const { data } = await Axios(config);
    return data;
  };

  const { isLoading, error, data } = useQuery("vendor", GetVendorName);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data === undefined) return "wait a sec";

  return <Typography variant="h3">{data.vendorName}'s Store</Typography>;
}
