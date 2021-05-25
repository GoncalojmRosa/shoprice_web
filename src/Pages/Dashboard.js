import { Helmet } from 'react-helmet';
import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from '../Components/dashboard//Budget';
import LatestOrders from '../Components/dashboard//LatestOrders';
// import LatestProducts from '../Components/dashboard//LatestProducts';
// import Sales from '../Components/dashboard//Sales';
import TasksProgress from '../Components/dashboard//TasksProgress';
import TotalCustomers from '../Components/dashboard//TotalCustomers';
import TotalProfit from '../Components/dashboard//TotalProfit';
import TrafficByDevice from '../Components/dashboard//TrafficByDevice';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Shoprice</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
