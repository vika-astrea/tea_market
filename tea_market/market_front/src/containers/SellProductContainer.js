import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import ErrorNotice from "../components/ErrorNotice";
import NotLogged from "../components/NotLogged";
import FirstRow from "../components/sell product components/FirstRow";
import SecondRow from "../components/sell product components/SecondRow";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SellProductContainer() {
  const { userData } = useContext(UserContext);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [error, setError] = useState();

  const classes = useStyles();

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">Sell product</Typography>
          <br />
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <form className={classes.root} noValidate autoComplete="off">
            <FirstRow
              type={type}
              setType={setType}
              material={material}
              setMaterial={setMaterial}
            />

            <br />
            <SecondRow />
            <br />
            <>
              {" "}
              <Button variant="contained" color="primary">
                Sell Item{" "}
              </Button>
            </>
          </form>
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
