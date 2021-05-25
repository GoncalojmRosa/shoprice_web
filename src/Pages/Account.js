import { Helmet } from 'react-helmet';
import React, {useEffect, useState, useContext} from 'react'
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../Components/account/AccountProfile';
import AccountProfileDetails from '../Components/account/AccountProfileDetails';
import AccountSuggestions from '../Components/account/AccountSuggestions';
import { getSuggestions } from '../services/auth';
import { AuthContext } from '../contexts/auth';

function Account(){

  const { user } = useContext(AuthContext);

  const [suggestions, setSuggestion] = useState([]);


  useEffect(()=>{
    getSuggestions(user).then((res) => {
      const sug = res.data;
      
      setSuggestion(sug);
      // setComments(comment);
    });
  }, [])


  return(
  <>
    <Helmet>
      <title>Conta | Shoprice</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile updateButton={true} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
          {suggestions.map((suggestion)=>{
            return(
              <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <AccountSuggestions avatar={suggestion.user.avatar} name={suggestion.user.name} text={suggestion.text} />
          </Grid>
            )
          })}
          </Grid>
      </Container>
    </Box>
  </>)
};

export default Account;
