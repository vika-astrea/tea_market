import { Button, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import { useQuery } from "react-query";
import { GetUserProducts } from "../Queries";
import { useHistory } from "react-router-dom";
import DashList from "../components/DashList";
import EditingProduct from "../components/EditingProduct";

export default function DashboardContainer() {
  //Hooks
  const { userData } = useContext(UserContext);
  let history = useHistory();
  const [listing, setListing] = useState(true);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [stock, setStock] = useState("")
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [id, setId] = useState("");

  //

  function handleSellClick() {
    history.push("/sell");
  }

  //Query
  const { isLoading, error, data } = useQuery(userData.token, GetUserProducts);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">My Dashboard</Typography>
          <br />
          <Typography variant="h6">My items on sale:</Typography>
          <br/>
          {data.length === 0 ? (
            <>
              <Typography variant="h7">
                You have nothing on sale right now!
              </Typography>
              <br />
              <br />
              <Button
                color="primary"
                variant="outlined"
                onClick={handleSellClick}
              >
                {" "}
                Sell a Product
              </Button>
            </>
          ) : listing ? (
            <>
              <DashList
                data={data}
                token={userData.token}
                setListing={setListing}
                setType={setType}
                setMaterial={setMaterial}
                setName={setName}
                setAmount={setAmount}
                setStock={setStock}
                setPrice={setPrice}
                setImg={setImg}
                setId={setId}
              />
              <br/>
              <br/>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleSellClick}
              >
                {" "}
                + Sell Item{" "}
              </Button>
            </>
          ) : (
            <EditingProduct
              type={type}
              material={material}
              stock={stock}
              name={name}
              amount={amount}
              price={price}
              img={img}
              id={id}
              setListing={setListing}
            />
          )}
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
