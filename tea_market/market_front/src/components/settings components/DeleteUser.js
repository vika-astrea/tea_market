import React, { useContext, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { queryCache, useMutation } from "react-query";
import { DelUser } from "../../Queries";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DeleteUser() {
  const { userData, setUserData } = useContext(UserContext);
  const [pass, setPass] = useState("");

  const classes = useStyles();
  let history = useHistory();

  const [mutate] = useMutation(DelUser, {
    onSuccess: () => {
      queryCache.invalidateQueries();
    },
  });

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        password: pass,
        token: userData.token,
      });
      setUserData({
        token: undefined,
        user: undefined,
      });
      history.push("/home");
      localStorage.setItem("auth-token", "");
    } catch (err) { console.log( err.response.data.msg)}
  };

  return (
    <form>
      <FormControl className={classes.formControl}>
        <Typography variant="h6">WARNING: THIS ACTION IS FINAL.</Typography>
        <TextField
          type="password"
          label="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <Button variant="contained" color="secondary" onClick={deleteHandler}>
          Delete Account{" "}
        </Button>
      </FormControl>
    </form>
  );
}
