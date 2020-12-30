import React, { useState, useContext } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import { makeStyles } from "@material-ui/core/styles";
import ProductContext from "../context/ProductContext";
import { useHistory } from "react-router-dom";
import DashButtons from "./buttons/DashButtons";

export default function DashList(props) {
  const [dense] = useState(false);
  const [secondary] = useState(false);
  const { setProductId } = useContext(ProductContext);
  let history = useHistory();

  //Styling
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  const classes = useStyles();
  //

  return (
    <>
      {" "}
      <div className={classes.demo}>
        <List dense={dense}>
          {props.data.map((product) => {
            return (
              <ListItem
                key={product._id}
                button="true"
                onClick={(e) => {
                  setProductId(product._id);
                  history.push("/product");
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <LabelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemSecondaryAction>
                  <DashButtons
                    token={props.token}
                    _id={product._id}
                    setListing={props.setListing}
                    setType={props.setType}
                    setMaterial={props.setMaterial}
                    setName={props.setName}
                    setAmount={props.setAmount}
                    setPrice={props.setPrice}
                    setImg={props.setImg}
                    setId={props.setId}
                    product={product}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
}
