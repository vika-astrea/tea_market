import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import SettingsIcon from "@material-ui/icons/Settings";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function NavAccount() {
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  

  let history = useHistory();

  function handleCartClick() {
    history.push("/cart");
  }

  function handleWishClick() {
    history.push("/wishlist");
  }

  function handleSellClick() {
    history.push("/sell");
  }

  function handleDashClick() {
    history.push("/dash");
  }

  function handleSettingsClick() {
    history.push("/settings");
  }
  function handleLoginClick() {
    history.push("/login");
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {userData.user ? (
        <>
          <ListItem>
            {" "}
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Welcome {userData.user.displayName} !</ListItemText>
          </ListItem>
          <ListItem button onClick={handleCartClick}>
            {" "}
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>My Cart</ListItemText>
          </ListItem>
          <ListItem button onClick={handleWishClick}>
            {" "}
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText>My Wishlist</ListItemText>
          </ListItem>
          <ListItem button onClick={handleClick}>
            {" "}
            <ListItemIcon>
              <LoyaltyIcon />
            </ListItemIcon>
            <ListItemText primary={"My products"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={handleSellClick}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText>Sell product</ListItemText>
              </ListItem>
              <ListItem button onClick={handleDashClick}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText>My Dashboard</ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleSettingsClick}>
            {" "}
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>My account settings</ListItemText>
          </ListItem>
        </>
      ) : (
        <>
          {" "}
          <ListItemText primary={"Account"} />
          <ListItem button onClick={handleLoginClick}>
            <ListItemIcon>
              <AccountCircleIcon color="disabled" />
            </ListItemIcon>
            <ListItemText primary={" Log in "} />
          </ListItem>
        </>
      )}
    </>
  );
}
