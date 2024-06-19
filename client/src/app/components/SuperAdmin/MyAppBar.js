import React from 'react';
import { AppBar, Toolbar } from 'react-admin';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';


const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledImage = styled('img')({
  width: '50px',
  height: 'auto',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#2E3B55', 
});

const StyledAppBar = styled(AppBar)({
  top: 60, 
  bottom: 'auto',
  backgroundColor: '#2E3B55', 
});

const MyAppBar = (props) => {
  return (
    <StyledAppBar {...props}>
      <StyledToolbar>
        <StyledTypography variant="h6">
          
        </StyledTypography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default MyAppBar;