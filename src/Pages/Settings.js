import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsWebsites from '../Components/settings/SettingsWebsites';
import React from 'react'
const SettingsView = () => (
  <>
    <Helmet>
      <title>Settings | Shoprice</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      {/* <Container maxWidth="lg"> */}
        {/* <Box sx={{ pt: 3 }}> */}
          <SettingsWebsites />
        {/* </Box> */}
      {/* </Container> */}
    </Box>
  </>
);

export default SettingsView;
