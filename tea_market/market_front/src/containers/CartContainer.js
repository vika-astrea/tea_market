import { Typography } from '@material-ui/core';
import React, { useContext} from 'react';
import NotLogged from '../components/NotLogged';
import UserContext from '../context/UserContext'

export default function CartContainer () {
  const { userData } = useContext(UserContext);

    return (
      <>
        {userData.user ? (<> <Typography variant="h3">
          My Cart
          
          </Typography>
          - lista de los productos productos
          -Cada item de la lista tiene que tener nombre, vendor y precio
          -abajo tiene que estar el precio final y el botón de Buy Now
          -el boton tiene que tener el "fin de demo" pop up onClick
          -My cart tiene que tener un numero indicando cuantos items hay en el cart
          
           </>):(<NotLogged/>)}
      </>
    )
  
}
