import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

import { Link, useHistory } from "react-router-dom";
import ErrorNotice from "../components/ErrorNotice";

export default function LogInContainer() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState();

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/user/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.title} variant="h3" noWrap>
        Log in{" "}
      </Typography>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <form className={classes.root} noValidate autoComplete="off">
        <br />
        <TextField
          label="E-mail"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={submit}>
          Log in
        </Button>
      </form>
      <br />
      <Typography variant="h6" noWrap>
        You don't have an account yet? <Link to="/register">Sign up</Link> and
        jump right in! it will only take a second.
      </Typography>
    </React.Fragment>
  );
}
