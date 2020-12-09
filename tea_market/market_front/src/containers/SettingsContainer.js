import { Divider, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import NotLogged from "../components/NotLogged";
import ChangeEmail from "../components/settings components/ChangeEmail";
import ChangeName from "../components/settings components/ChangeName";
import ChangePass from "../components/settings components/ChangePass";
import DeleteUser from "../components/settings components/DeleteUser";
import UserContext from "../context/UserContext";

export default function SettingsContainer() {
  const { userData } = useContext(UserContext);

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">My Account Settings</Typography>
          <br />
          <br />
          <Typography variant="h5"> Change Display Name</Typography>
          <ChangeName />
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Typography variant="h5"> Change E-mail</Typography>
          <ChangeEmail />
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Typography variant="h5"> Reset Password</Typography>
          <ChangePass />
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Typography variant="h5"> Delete Account</Typography>
          <br />
          <DeleteUser />
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
