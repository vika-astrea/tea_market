import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import NotLogged from "../components/NotLogged";
import UserContext from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function SellProductContainer() {
  const { userData } = useContext(UserContext);
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");

  const classes = useStyles();

  return (
    <>
      {userData.user ? (
        <>
          {" "}
          <Typography variant="h3">Sell product</Typography>
          <br />
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="name" label="Product Name" />
            <FormControl className={classes.formControl}>
              <InputLabel id="type select label">Type</InputLabel>
              <Select
                labelId="type select label"
                id="type select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value={"Tea"}>Tea</MenuItem>
                <MenuItem value={"Cup"}>Cup</MenuItem>
                <MenuItem value={"Pot"}>Pot</MenuItem>
                <MenuItem value={"Set"}>Set</MenuItem>
                <MenuItem value={"Misc"}>Miscelaneous</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <>
                {type === "Tea" ? (
                  <>
                    {" "}
                    <InputLabel id="tea select label">It comes in:</InputLabel>
                    <Select
                      labelId="tea select label"
                      id="tea select"
                      value={material}
                      onChange={(e) => {
                        e.preventDefault();
                        setMaterial(e.target.value);
                      }}
                    >
                      <MenuItem value={"Bags"}>Bags</MenuItem>
                      <MenuItem value={"Strands"}>Strands</MenuItem>
                    </Select>
                  </>
                ) : (
                  <TextField
                    id="Material"
                    label="Material"
                    onChange={(e) => {
                      e.preventDefault();
                      setMaterial(e.target.value);
                    }}
                  />
                )}
              </>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <TextField id="Ammount" label="Amount" />
              <br />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                type="number"
                id="price"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="img" label="Hosted image url adress" />
              <br />
            </FormControl>
            <br/>
<>            <Button variant="contained"
            color="primary">Sell Item </Button></>
          </form>
        </>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
