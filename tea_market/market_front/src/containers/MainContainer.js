//import { Container } from "@material-ui/core";
import productData from "../productData";
import MediaCard from "../components/MediaCard";
import { GridList, makeStyles } from "@material-ui/core";
import React from "react";

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
                  image={product.img}
                  name={product.name}
                  vendor={product.vendor}
                  type={product.type.type}
                  material={product.type.material}
                  price={product.price}
                  amount={product.amount}
                />
              );
            })}
        </GridList>
      </div>
    </React.Fragment>
  );
}
