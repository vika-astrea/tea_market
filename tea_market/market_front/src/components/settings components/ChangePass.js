import { Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import { queryCache, useMutation } from "react-query";
import UserContext from "../../context/UserContext";
import { ChangeUserPass } from "../../Queries";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ChangePass() {
  const classes = useStyles();
  const [newPass, setNewPass] = useState("");
  const [pass, setPass] = useState("");
  const [checkPass, setCheckPass] = useState("");

  const { userData } = useContext(UserContext);

  const [mutate] = useMutation(ChangeUserPass, {
    onSuccess: () => {
      queryCache.invalidateQueries();
    },
  });

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: userData.user.id,
        newPassword: newPass,
        passwordCheck: checkPass,
        password: pass,
        token: userData.token,
      });
    } catch (error) {}
    setPass("");
    setNewPass("");
    setCheckPass("");
  };

  return (
    <form>
      <FormControl className={classes.formControl}>
        <TextField
          type="password"
          label="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <TextField
          type="password"
          label="Repeat New Password"
          value={checkPass}
          onChange={(e) => setCheckPass(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" onClick={editHandler}>
          Reset Password{" "}
        </Button>
      </FormControl>
    </form>
  );
}
