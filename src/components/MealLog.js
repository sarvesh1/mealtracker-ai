import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function MealLog() {
  // This is a placeholder for Phase 4
  // We'll implement the full functionality in a later phase
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Meal Log
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your meal history will appear here.
      </Typography>
      
      <Paper sx={{ mt: 3, p: 0 }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="No meals logged yet"
              secondary="Your meal history will appear here once you start adding meals."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="How to add meals"
              secondary="Go to the 'Upload Photo' section to add a new meal."
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default MealLog;
