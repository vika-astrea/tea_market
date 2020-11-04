//import { Container } from "@material-ui/core";
import productData from "../productData";
import MediaCard from "../components/MediaCard";
import { Button, GridList, makeStyles } from "@material-ui/core";
import React from 'react'

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


if (props.type === ""){
  return(
  <div className={classes.root}>
  <GridList cellHeight={180} className={classes.gridList}>
    {productData.map((product, i) => {
      return (
        <MediaCard
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
</div>);
} else{
  return (<React.Fragment>
    <Button variant="contained" onClick={(e) => props.setType("")}>Remove filters</Button>
      <div className={classes.root}>
        
      <GridList cellHeight={180} className={classes.gridList}>
        {productData.filter((product)=>product.type.type===props.type).map((product, i) => {
          return (
            <MediaCard
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
    </div></React.Fragment>
  );}
}
