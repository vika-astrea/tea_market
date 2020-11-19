import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SettingsContainer() {
  const { userData } = useContext(UserContext);

  const classes = useStyles();

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">My Account Settings</Typography>
          <br />
          <br />
          <Typography variant="h5"> Change Display Name</Typography>
          <form>
            <FormControl className={classes.formControl}>
              <TextField label="New Display Name" />
              <TextField type="password" label="Password" />
              <br />
              <Button variant="contained" color="primary">
                Change Display Name{" "}
              </Button>
            </FormControl>
          </form>
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Typography variant="h5"> Change E-mail</Typography>
          <form>
            <FormControl className={classes.formControl}>
              <TextField label="New E-mail" />
              <TextField type="password" label="Password" />
              <br />
              <Button variant="contained" color="primary">
                Change E-mail{" "}
              </Button>
            </FormControl>
          </form>
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Typography variant="h5"> Reset Password</Typography>
          <form>
            <FormControl className={classes.formControl}>
              <TextField type="password" label="New Password" />
              <TextField type="password" label="Repeat New Password" />
              <TextField type="password" label="Password" />
              <br />
              <Button variant="contained" color="primary">
                Reset Password{" "}
              </Button>
            </FormControl>
          </form>
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Typography variant="h5"> Delete Account</Typography>
          <br />
          <form>
            <FormControl className={classes.formControl}>
              <Typography variant="h6">
                WARNING: THIS ACTION IS FINAL.
              </Typography>
              <TextField type="password" label="Password" />
              <br />
              <Button variant="contained" color="secondary">
                Delete Account{" "}
              </Button>
            </FormControl>
          </form>
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
