import { Typography } from '@material-ui/core';
import React, { useContext} from 'react';
import NotLogged from '../components/NotLogged';
import UserContext from '../context/UserContext'

export default function DashboardContainer () {
  const { userData } = useContext(UserContext);

    return (
      <>
        {userData.user ? (<> <Typography variant="h3">
          My Dashboard
          
          
          </Typography>
          Productos en venta 
          ventas totales
          ((gráficos ?? ))
          
           </>):(<NotLogged/>)}
      </>
    )
  
}
