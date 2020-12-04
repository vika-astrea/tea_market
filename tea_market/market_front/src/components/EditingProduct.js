import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import ErrorNotice from "../components/ErrorNotice";
import NotLogged from "../components/NotLogged";
import FirstRow from "../components/sell product components/FirstRow";
import SecondRow from "../components/sell product components/SecondRow";
import UserContext from "../context/UserContext";
import { useMutation, queryCache, } from "react-query";
import { UpdateProduct } from "../Queries";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EditingProduct(props) {
  //Hooks
  const { userData } = useContext(UserContext);
  const [type, setType] = useState(props.type);
  const [material, setMaterial] = useState(props.material);
  const [name, setName] = useState(props.name);
  const [amount, setAmount] = useState(props.amount);
  const [price, setPrice] = useState(props.price);
  const [img, setImg] = useState(props.img);
  const [vendor, setVendor] = useState(userData.user.displayName);
  const [error, setError] = useState();
  const history = useHistory();
  const classes = useStyles();

  //Query
  const [mutate] = useMutation(UpdateProduct, {
    onSuccess: () => {
      queryCache.invalidateQueries();
    },
  });

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: props.id,
        name: name,
        vendor: vendor,
        price: price,
        img: img,
        type: type,
        material: material,
        amount: amount,
        token: userData.token,
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
          <Typography variant="h5">Edit product</Typography>
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
              setAmount={setAmount}
              setPrice={setPrice}
              setUrl={setImg}
            />
            <br />
            <>
              {" "}
              <Button variant="contained" color="primary" onClick={editHandler}>
                Edit Item{" "}
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
