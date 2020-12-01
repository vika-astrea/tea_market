import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";
import { useMutation } from "react-query";
import { RemoveFromCart } from "../../Queries";

export default function RemoveCartButton(props) {
  const [mutate] = useMutation(RemoveFromCart);

  const remove = async (e) => {
    e.preventDefault();
    try {
      await mutate({
        _id: props._id,
        productId: props.productId,
        token: props.token,
      });
    } catch (error) {}
  };

  return (
    <IconButton edge="end" aria-label="remove" onClick={remove}>
      <HighlightOffIcon color="secondary" />
    </IconButton>
  );
}
