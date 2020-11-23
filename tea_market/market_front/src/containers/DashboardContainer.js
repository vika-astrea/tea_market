import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";
import { GetUserProducts } from "../Queries";


export default function DashboardContainer() {
  const { userData } = useContext(UserContext);

  const [dense] = useState(false);
  const [secondary] = useState(false);

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

  const { isLoading, error, data } = useQuery(userData.token , GetUserProducts);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">My Dashboard</Typography>
          <Typography variant="h6" className={classes.title}>
            My items on sale:
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {data.map((product)=>{return( <ListItem>
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
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>)})}
               
              
            </List>
          </div>
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
