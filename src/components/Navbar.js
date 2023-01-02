import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function DrawerAppBar(props) {

  const linkStyling={
      color: "#fff", 
      textDecoration: "none", 
      display: "inline-block", 
      padding: "0 10px"
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ backgroundColor: "#495464", border: "none", boxShadow: "none"}}>
        <Toolbar>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontFamily:"'Roboto', sans-serif", fontWeight: "200"}}
          >
            MY BAKERY
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}