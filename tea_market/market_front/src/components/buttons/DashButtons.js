import { IconButton } from "@material-ui/core";
import React from "react";
import DeleteProductButton from "./DeleteProductButton";
import EditIcon from "@material-ui/icons/Edit";

export default function DashButtons(props) {
  return (
    <div style={{display:"flex"}}>
      <DeleteProductButton token={props.token} _id={props._id} />
      <IconButton
        onClick={(e) => {
          props.setListing(false);
          props.setType(props.product.type);
          props.setMaterial(props.product.material);
          props.setName(props.product.name);
          props.setAmount(props.product.amount);
          props.setPrice(props.product.price);
          props.setImg(props.product.img);
          props.setId(props.product._id);
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
}
