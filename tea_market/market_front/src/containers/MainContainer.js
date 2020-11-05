import productData from "../productData";
import MediaCard from "../components/MediaCard";
import { GridList, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";

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

  const [name, setName] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [amount, setAmount] = useState("");

  const classes = useStyles();

  const filterByType = (product) => {
    if (product.type.type === props.type) {
      return true;
    }
    if (props.type === "") {
      return true;
    } else {
      return false;
    }
  };

  if (name === "" && vendor === "") {
    return (
      <React.Fragment>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {productData
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
                    type={product.type.type}
                    material={product.type.material}
                    price={product.price}
                    amount={product.amount}
                    setName={setName}
                    setVendor={setVendor}
                    setImg={setImg}
                    setPrice={setPrice}
                    setType={setType}
                    setMaterial={setMaterial}
                    setAmount={setAmount}
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
        setName={setName}
        setVendor={setVendor}
        setImg={setImg}
        setPrice={setPrice}
        setType={setType}
        setMaterial={setMaterial}
        setAmount={setAmount}
      />
    );
  }
}
