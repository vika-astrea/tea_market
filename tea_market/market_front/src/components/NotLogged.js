import { Typography } from '@material-ui/core'
import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NotLogged extends Component {
  render() {
    return (
      <div>
        <Typography variant="h4">
        You are not logged in! 
        </Typography>
        <br/>
        <Typography variant="h5">
        <Link to="/login">Log in</Link> or <Link to="/register">create an account</Link> and join today !
        </Typography>
      </div>
    )
  }
}
