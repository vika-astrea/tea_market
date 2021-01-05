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
        <TextField id="Ammount" label="Amount" 
                onChange={(e) => props.setAmount(e.target.value)}
                value={props.amount}/>
        <br />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input
          type="number"
          id="price"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          onChange={(e) => props.setPrice(e.target.value)}
          value={props.price}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="stock">Units available</InputLabel>
        <Input
          type="number"
          id="stock"
          endAdornment={<InputAdornment position="end">Units</InputAdornment>}
          onChange={(e) => props.setStock(e.target.value)}
          value={props.stock}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField id="img" label="Hosted image url adress"
                onChange={(e) => props.setUrl(e.target.value)}
                value={props.url} />
        <br />
      </FormControl>
    </>
  );
}
