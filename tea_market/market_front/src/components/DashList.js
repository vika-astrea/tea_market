import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import EditIcon from "@material-ui/icons/Edit";
import DeleteProductButton from "./buttons/DeleteProductButton";
import { makeStyles } from "@material-ui/core/styles";

export default function DashList(props) {
  const [dense] = useState(false);
  const [secondary] = useState(false);

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
              <ListItem key={product._id}>
                <ListItemAvatar>
                  <Avatar>
                    <LabelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={secondary ? "Secondary text" : null}
                />
                <DeleteProductButton token={props.token} _id={product._id} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={(e) => {
                      props.setListing(false);
                      props.setType(product.type);
                      props.setMaterial(product.material);
                      props.setName(product.name);
                      props.setAmount(product.amount);
                      props.setPrice(product.price);
                      props.setImg(product.img);
                      props.setId(product._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
}
