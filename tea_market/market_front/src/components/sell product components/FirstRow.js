import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, {useContext,} from "react";
import UserContext from "../../context/UserContext";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FirstRow(props) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);


  return (
    <>
      <TextField
        id="name"
        label="Product Name"
        onChange={(e) => {props.setName(e.target.value); props.setVendor(userData.user.displayName)}}
        value={props.name}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="type select label">Type</InputLabel>
        <Select
          labelId="type select label"
          id="type select"
          value={props.type}
          onChange={(e) => props.setType(e.target.value)}
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
          {props.type === "Tea" ? (
            <>
              {" "}
              <InputLabel id="tea select label">It comes in:</InputLabel>
              <Select
                labelId="tea select label"
                id="tea select"
                value={props.material}
                onChange={(e) => {
                  e.preventDefault();
                  props.setMaterial(e.target.value);
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
              value={props.material}
              onChange={(e) => {
                e.preventDefault();
                props.setMaterial(e.target.value);
              }}
            />
          )}
        </>
      </FormControl>
    </>
  );
}
