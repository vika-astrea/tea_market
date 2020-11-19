import { Typography } from '@material-ui/core';
import React, { useContext} from 'react';
import NotLogged from '../components/NotLogged';
import UserContext from '../context/UserContext'

export default function CartContainer () {
  const { userData } = useContext(UserContext);

    return (
      <>
        {userData.user ? (<> <Typography variant="h3">
          My Wishlist
                  </Typography>
                  
                  -la lista tiene las mismas tarjetas , excepto que solo tienen la opción de Buy Now. 
 </>):(<NotLogged/>)}
      </>
    )
  
}
