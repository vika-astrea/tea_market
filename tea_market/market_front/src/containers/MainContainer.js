import { useQuery } from "react-query";
import { GetAllProducts } from "../Queries";
import MediaCard from "../components/MediaCard";
import { GridList, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";
//import UserContext from "../context/UserContext";


export default function MainContainer(props) {
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

  
 // const { userData } = useContext(UserContext);

  const [name, setName] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId]= useState("")
  const [buyerId, setBuyerId]= useState("")

  const classes = useStyles();

  const filterByType = (product) => {
    if (product.type === props.type) {
      return true;
    }
    if (props.type === "") {
      return true;
    } else {
      return false;
    }
  };

  const { isLoading, error, data } = useQuery("repoData", GetAllProducts);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (name === "" && vendor === "") {
    return (
      <React.Fragment>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {data
              .filter(filterByType)
              .sort(function (a, b) {
                if (props.func === true) {
                  return parseFloat(a.price) - parseFloat(b.price);
                }
                if (props.func === false) {
                  return parseFloat(b.price) - parseFloat(a.price);
                } else {
                  return undefined;
                }
              })
              .map((product, i) => {
                return (
                  <MediaCard
                    key={i}
                    i={i}
                    product={product}
                    img={product.img}
                    name={product.name}
                    vendor={product.vendor}
                    type={product.type}
                    material={product.material}
                    price={product.price}
                    amount={product.amount}
                    id={product._id}
                    setName={setName}
                    setVendor={setVendor}
                    setImg={setImg}
                    setPrice={setPrice}
                    setType={setType}
                    setMaterial={setMaterial}
                    setAmount={setAmount}
                    setId={setId}
                    setBuyerId={setBuyerId}
                  />
                );
              })}
          </GridList>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <ProductGrid
        img={img}
        name={name}
        vendor={vendor}
        type={type}
        material={material}
        price={price}
        amount={amount}
        id={id}
        buyerId={buyerId}
        setName={setName}
        setVendor={setVendor}
        setImg={setImg}
        setPrice={setPrice}
        setType={setType}
        setMaterial={setMaterial}
        setAmount={setAmount}
        setId={setId}
        setBuyerId={setBuyerId}
      />
    );
  }
}
