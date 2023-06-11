import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';

export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar         style={{display:"flex",justifyContent:"flex-end"}}>
          <Close
          className={props.className}
            size="large"
            style={{cursor:"pointer",float:"right"}}
            sx={{ mr: 2 }}
            onClick={()=>{
                props.onClose()
            }}
          >
            <MenuIcon />
          </Close>
        </Toolbar>
      </AppBar>
    </Box>
  );
}