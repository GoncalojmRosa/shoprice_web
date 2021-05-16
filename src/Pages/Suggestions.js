import { Helmet } from 'react-helmet';
import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AllSuggestions from '../Components/suggestion/Suggestion';
import { indexSuggestions } from '../services/auth';
import { AuthContext } from '../contexts/auth';



function Suggestions(){
  const { user } = useContext(AuthContext);

  const [suggestions, setSuggestion] = useState([]);


  useEffect(()=>{
    indexSuggestions(user).then((res) => {
      const sug = res.data;
      setSuggestion(sug);
      // setComments(comment);
    });
  }, [])


  return(
  <>
    <Helmet>
      <title>Account | Material Kit</title>
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
          {suggestions.map((suggestion)=>{
            console.log(suggestion)
            return (<Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              <AllSuggestions avatar={suggestion.user.avatar} name={suggestion.user.name} text={suggestion.text} />
            </Grid>)
          })}
        </Grid>
      </Container>
    </Box>
  </>
  )};

export default Suggestions;
