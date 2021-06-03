import { Helmet } from 'react-helmet';
import { Box } from '@material-ui/core';
import CustomerListResults from '../Components/customer/CustomerListResults';

function CustomerList(){

  return (
    <>
      <Helmet>
        <title>Utilizadores | Shoprice</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        {/* <Container maxWidth={false}> */}
          {/* <CustomerListToolbar /> */}
          {/* <Box sx={{ pt: 3 }}> */}
            <CustomerListResults />
          {/* </Box> */}
        {/* </Container> */}
      </Box>
    </>
  )
};

export default CustomerList;
