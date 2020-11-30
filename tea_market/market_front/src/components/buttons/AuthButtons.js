import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "4px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function AuthButtons() {
  const { userData, setUserData } = useContext(UserContext);
  const classes = useStyles();

  let history = useHistory();

  function handleLoginClick() {
    history.push("/login");
  }

  function handleRegisterClick() {
    history.push("/register");
  }

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    history.push("/home");
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className={classes.sectionDesktop}>
      {userData.user ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={logout}
        >
          Log out
        </Button>
      ) : (
        <>
          {" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleLoginClick}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleRegisterClick}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}
