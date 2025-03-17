import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Meal Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to MealTracker AI! This dashboard will show your recent meals and statistics.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Meals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your meal history will appear here once you start logging meals.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Meal statistics will be displayed here.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
