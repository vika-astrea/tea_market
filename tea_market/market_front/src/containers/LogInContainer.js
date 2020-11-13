import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

export default function LogInContainer() {
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
      <form className={classes.root} noValidate autoComplete="off">
        <br />
        <TextField
          id="outlined-password-input"
          label="E-mail"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <br />
        <br />
        <Button variant="contained" color="primary">
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
