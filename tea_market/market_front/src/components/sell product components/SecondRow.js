import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SecondRow(props) {
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField id="Ammount" label="Amount" />
        <br />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input
          type="number"
          id="price"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField id="img" label="Hosted image url adress" />
        <br />
      </FormControl>
    </>
  );
}
