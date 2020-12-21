import { GridList, makeStyles } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import MediaCard from "../components/MediaCard";
import { GetAllProducts } from "../Queries";

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
    if (product.type === props.type) {
      return true;
    }
    if (props.type === "") {
      return true;
    } else {
      return false;
    }
  };

  const { isLoading, error, data } = useQuery("main", GetAllProducts);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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
                  setId={props.setId}
                />
              );
            })}
        </GridList>
      </div>
    </React.Fragment>
  );
}
