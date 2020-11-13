import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function NavAccount() {
  const { userData, setUserData } = useContext(UserContext);

  let history = useHistory();

  function handleLinkClick() {
    history.push("/login");
  }

  const logout = () =>{
    setUserData({
      token: undefined,
      user:undefined
    });
    localStorage.setItem("auth-token", "")
  };

  return (
    <>
      {userData.user ? (
        <>
        <ListItem>
        <ListItemText>Welcome {userData.user.displayName} !</ListItemText>
        </ListItem>
        <ListItem button onClick={logout}>
<ListItemText >Log out</ListItemText>
        </ListItem>
        </>
      ) : (
        <ListItem button onClick={handleLinkClick}>
          <ListItemIcon>
            <AccountCircleIcon color="disabled" />
          </ListItemIcon>
          <ListItemText primary={" Log in "} />
        </ListItem>
      )}
    </>
  );
}
