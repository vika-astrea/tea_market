import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import ErrorNotice from "../components/ErrorNotice";
import NotLogged from "../components/NotLogged";
import FirstRow from "../components/sell product components/FirstRow";
import SecondRow from "../components/sell product components/SecondRow";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SellProductContainer() {
  //Hooks
  const { userData } = useContext(UserContext);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [vendor, setVendor] = useState("");
  const [error, setError] = useState();
  const history = useHistory();
  const classes = useStyles();

  //Query
  const submit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, vendor, price, img, type, material, amount,stock };
      await Axios({
        method: "post",
        url: "http://localhost:5000/products/new",
        data: newProduct,
        headers: { "X-auth-token": userData.token },
      });

      history.push("/dash");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">Sell product</Typography>
          <br />
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <form className={classes.root} noValidate autoComplete="off">
            <FirstRow
              type={type}
              setType={setType}
              material={material}
              setMaterial={setMaterial}
              name={name}
              setName={setName}
              setVendor={setVendor}
            />

            <br />
            <SecondRow
              amount={amount}
              price={price}
              url={img}
              stock = {stock}
              setStock = {setStock}
              setAmount={setAmount}
              setPrice={setPrice}
              setUrl={setImg}
            />
            <br />
            <>
              {" "}
              <Button variant="contained" color="primary" onClick={submit}>
                Sell Item{" "}
              </Button>
            </>
          </form>
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
