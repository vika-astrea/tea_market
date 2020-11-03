//import { Container } from "@material-ui/core";
import productData from "../productData";
import MediaCard from "../components/MediaCard";
import { GridList, makeStyles } from "@material-ui/core";

export default function MainContainer() {
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

  return (
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
    </div>
  );
}
