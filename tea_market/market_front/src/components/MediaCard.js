import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  let history = useHistory();


 

  return (
    <Card className={classes.root} key={props.i}>
      <CardActionArea
        button 
        onClick={(e)=>{
          props.setId(props.id);
          history.push("/product")}}      
      >
        <CardMedia
          className={classes.media}
          image={props.img}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.type}, It comes in: {props.material}.
          </Typography>
          <br />
          <Typography gutterBottom variant="h5" component="h2">
            Price: $ {props.price} for {props.amount}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            by: {props.vendor}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
