import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ErrorNotice(props) {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.button}
      startIcon={<ClearIcon />}
      onClick={props.clearError}
    >
      {props.message}
    </Button>
  );
}
