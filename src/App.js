import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PhotoUpload from './components/PhotoUpload';
import FoodRecognition from './components/FoodRecognition';
import MealLog from './components/MealLog';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green - food/health themed color
    },
    secondary: {
      main: '#ff9800', // Orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedFoods, setRecognizedFoods] = useState([]);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setRecognizedFoods([]);
  };

  const handleRecognitionComplete = (foods) => {
    setRecognizedFoods(foods);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box sx={{ display: 'flex', flex: 1 }}>
            <Navigation />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route 
                  path="/upload" 
                  element={
                    <Box>
                      <PhotoUpload onImageSelect={handleImageSelect} />
                      {selectedImage && (
                        <FoodRecognition 
                          imageFile={selectedImage}
                          onRecognitionComplete={handleRecognitionComplete}
                        />
                      )}
                    </Box>
                  } 
                />
                <Route path="/meals" element={<MealLog />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
