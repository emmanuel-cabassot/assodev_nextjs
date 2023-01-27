import * as React from 'react';
import ProfileInfo from './components/profile-info';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import ResponsiveDrawer from '../atomes/nav/responsiveDrawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;
const drawerWidth = 240;

export default function ProfileIndex() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Grid pour le drawer (menu) */}
      <Box
        display={{ xs: 'none', sm: 'none', md: 'block' }}
        component="div"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

          <ResponsiveDrawer />

      </Box>
      {/* Grid pour le profile info */}
      <Grid item xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',

          width: '100%',
        }}
      >
        <ProfileInfo />
      </Grid>
    </Box>
  );
}

