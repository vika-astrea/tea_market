import React, { useContext, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import DashboardIcon from '@material-ui/icons/Dashboard';
import FavoriteIcon from '@material-ui/icons/Favorite';


export default function NavAccount() {
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  let history = useHistory();

  function handleLinkClick() {
    history.push("/login");
  }

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

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
          <ListItem>
            {" "}
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>My Cart</ListItemText>
          </ListItem>
          <ListItem>
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
 <ListItem><ListItemIcon><AddIcon/></ListItemIcon><ListItemText>Sell product</ListItemText></ListItem>
 <ListItem><ListItemIcon><DashboardIcon/></ListItemIcon><ListItemText>My Dashboard</ListItemText></ListItem>

              </List>
            </Collapse>
          <ListItem>
            {" "}
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>My account settings</ListItemText>
          </ListItem>

          <ListItem button onClick={logout}>
            {" "}
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </ListItem>
        </>
      ) : (<> <ListItemText primary={"Account"} />
        <ListItem button onClick={handleLinkClick}>
          <ListItemIcon>
            <AccountCircleIcon color="disabled" />
          </ListItemIcon>
          <ListItemText primary={" Log in "} />
        </ListItem></>
      )}
    </>
  );
}
