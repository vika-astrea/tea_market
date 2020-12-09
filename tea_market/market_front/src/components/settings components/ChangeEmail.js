import React, { useContext, useState } from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { queryCache, useMutation } from "react-query";
import UserContext from "../../context/UserContext";
import { ChangeUserEmail } from "../../Queries";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ChangeEmail() {

  const { userData } = useContext(UserContext);
  const [newEmail, setNewEmail] = useState("");
  const [pass, setPass] = useState("");
  const classes = useStyles();


  
  const [mutate] = useMutation(ChangeUserEmail, {
    onSuccess: () => {
      queryCache.invalidateQueries();
    },
  });


  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: userData.user.id,
        newEmail: newEmail,
        password: pass,
        token: userData.token,
      });
    } catch (error) {}
    setPass("");
    setNewEmail("");
  };
   

    return (
      <form>
      <FormControl className={classes.formControl}>
        <TextField label="New E-mail" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)}/>
        <TextField type="password" label="Password" value={pass} onChange={(e)=> setPass(e.target.value)}/>
        <br />
        <Button variant="contained" color="primary" onClick={editHandler}>
          Change E-mail{" "}
        </Button>
      </FormControl>
    </form>
    )
  
}
