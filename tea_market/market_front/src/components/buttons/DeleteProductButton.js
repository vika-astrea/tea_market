import { IconButton } from '@material-ui/core';
import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "react-query";
import { DeleteProduct } from '../../Queries';



export default function DeleteProductButton (props) {
  const [mutate] = useMutation(DeleteProduct);

  const handleDelete = async (e) => {
    try {
      await mutate({
        _id: props._id,
         token: props.token,
      });
    } catch (error) {}
  };
  
    return (
      <div>
                            <IconButton edge="end" aria-label="delete" onClick={handleDelete} >
                      <DeleteIcon />
                    </IconButton>
      </div>
    )
  
}
