import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import ErrorNotice from "../components/ErrorNotice";
import NotLogged from "../components/NotLogged";
import FirstRow from "../components/sell product components/FirstRow";
import SecondRow from "../components/sell product components/SecondRow";
import UserContext from "../context/UserContext";
import ProductContext from "../context/ProductContext"
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

export default function EditingProduct(props) {
  //Hooks
  const { userData } = useContext(UserContext);
  const {setProductId} = useContext(ProductContext)
  const [type, setType] = useState(props.type);
  const [material, setMaterial] = useState(props.material);
  const [name, setName] = useState(props.name);
  const [amount, setAmount] = useState(props.amount);
  const [price, setPrice] = useState(props.price);
  const [img, setImg] = useState(props.img);
  const [vendor, setVendor] = useState(userData.user.displayName);
  const [error, setError] = useState();
  const classes = useStyles();
  const history = useHistory();


  const _id =props.id

  //Query

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {_id, name, vendor, price, img, type, material, amount };
      await Axios({
        method: "patch",
        url: "http://localhost:5000/products/updateProduct",
        data: newProduct,
        headers: { "X-auth-token": userData.token },
      });

      setProductId(_id);
      
      history.push("/product");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  /////  
  const cancelHandler = () => {
    setType("");
    setMaterial("");
    setName("");
    setAmount("");
    setPrice("");
    setImg("");
    setVendor("");
    props.setListing(true);
  };

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h5">Edit product</Typography>
          <br />
          {error ? (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          ): null}
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
              <Button
                variant="contained"
                color="secondary"
                onClick={cancelHandler}
              >
                Cancel Edit
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
