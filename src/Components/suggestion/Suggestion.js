import {
  Box,
    Card,
    Container,
    CardContent,
    CardMedia,
    CardHeader,
    Typography,
    Avatar,
    IconButton,
  } from '@material-ui/core';
  import Fab from '@material-ui/core/Fab';
  import AddIcon from '@material-ui/icons/Add';
  import React, {useEffect, useState, useContext} from 'react';
  import { getProfile, updateProfile } from '../../services/auth';
  import { AuthContext } from '../../contexts/auth';
  import api from '../../services/api';

  
  function AccountSuggestions({avatar, text, name}){
 
    return (
      <form
        autoComplete="off"
        noValidate
        // onSubmit={handleUpdateProfile}
      >
        <Card >
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={avatar}
          sx={{
            height: 70,
            width: 70
          }}/>
        }
        action={
          // <IconButton aria-label="settings">
            <Fab color="primary" aria-label="add" size="small">
                <AddIcon />
            </Fab>
          // </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body1" color="textprimary" component="p">
          {text}
        </Typography>
        <Box>
          <Container maxWidth="lg">
            <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={avatar}
              sx={{
                height: 50,
                width: 50
              }}/>
            }
            title={name}
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {text}
            </Typography>
          </CardContent>
        </Container>
      </Box>
      </CardContent>
        </Card>
      </form>
    );
  };
  
  export default AccountSuggestions;
  