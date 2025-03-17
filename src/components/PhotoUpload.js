import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function PhotoUpload() {
  // This is a placeholder for Phase 2
  // We'll implement the full functionality in the next phase
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Meal Photo
      </Typography>
      <Typography variant="body1" gutterBottom>
        Take or upload a photo of your meal to get started.
      </Typography>
      
      <Paper 
        sx={{
          mt: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '2px dashed #ccc',
          borderRadius: 2,
          bgcolor: 'background.default'
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Drop your meal photo here
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          or
        </Typography>
        <Button variant="contained" component="label">
          Select Photo
          <input hidden accept="image/*" type="file" />
        </Button>
      </Paper>
    </Box>
  );
}

export default PhotoUpload;
