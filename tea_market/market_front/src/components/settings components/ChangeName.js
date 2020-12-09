import React, { useContext, useState } from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { queryCache, useMutation } from "react-query";
import UserContext from "../../context/UserContext";
import { ChangeUserName } from "../../Queries";
import ErrorNotice from "../ErrorNotice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ChangeName() {
  const { userData } = useContext(UserContext);
  const [newName, setNewName] = useState("");
  const [pass, setPass] = useState("");
  const classes = useStyles();
  const [error, setError] = useState();


  const [mutate] = useMutation(ChangeUserName, {
    onSuccess: () => {
      queryCache.invalidateQueries();
    },
  });

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: userData.user.id,
        newName: newName,
        password: pass,
        token: userData.token,
      });
      setPass("");
      setNewName("");
    } catch (err) { err.response.data.msg && setError(err.response.data.msg);}

  };

  return (
    <>
    <div>
    {error && (
      <ErrorNotice
        message={error}
        clearError={() => setError(undefined)}
      />
    ) }
</div>
    <form>
      <FormControl className={classes.formControl}>
        <TextField label="New Display Name" value={newName} onChange={(e)=> setNewName(e.target.value)}/>
        <TextField type="password" label="Password"  value={pass} onChange={(e)=> setPass(e.target.value)}/>
        <br />
        <Button variant="contained" color="primary" onClick={editHandler}>
          Change Display Name{" "}
        </Button>
      </FormControl>
    </form></>
  );
}
