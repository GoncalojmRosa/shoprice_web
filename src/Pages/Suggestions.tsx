import { Helmet } from 'react-helmet';
import React, { forwardRef, useRef } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import AllSuggestions, { ModalHandles } from '../Components/suggestion/Suggestion';
import SuggestionToolBar from '../Components/suggestion/SuggestionToolBar';

function SuggestionComponent() {
  const modalRef = useRef<ModalHandles>(null);

  return (
    <>
      <Helmet>
        <title>Sugestões | Shoprice</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          {/* <SuggestionToolBar /> */}
          <Grid container spacing={3}>
            {/* {allSuggestion.map((suggestion: Suggestions) => {
              return ( */}
            <Grid item lg={12} md={12} xs={12}>
              <AllSuggestions
              // id={suggestion.id}
              // avatar={suggestion.user.avatar}
              // name={suggestion.user.name}
              // text={suggestion.text}
              // comments={suggestion.comments}
              // ref={modalRef}
              />
            </Grid>
            {/* );
            })} */}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default forwardRef(SuggestionComponent);
