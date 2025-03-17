import React, { useState, useEffect } from 'react';
import { analyzeFoodImage } from '../services/visionService';
import './FoodRecognition.css';

const FoodRecognition = ({ imageFile, onRecognitionComplete }) => {
  const [recognizedFoods, setRecognizedFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageFile) {
      analyzeImage();
    }
  }, [imageFile]);

  const analyzeImage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const foods = await analyzeFoodImage(imageFile);
      setRecognizedFoods(foods);
      onRecognitionComplete(foods);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Recognition error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFood = (index) => {
    const updatedFoods = recognizedFoods.filter((_, i) => i !== index);
    setRecognizedFoods(updatedFoods);
    onRecognitionComplete(updatedFoods);
  };

  const handleAddFood = (event) => {
    event.preventDefault();
    const newFood = event.target.food.value.trim();
    if (newFood) {
      const updatedFoods = [...recognizedFoods, { name: newFood, confidence: 1 }];
      setRecognizedFoods(updatedFoods);
      onRecognitionComplete(updatedFoods);
      event.target.reset();
    }
  };

  if (isLoading) {
    return (
      <div className="food-recognition-container">
        <div className="loading">Analyzing your meal...</div>
      </div>
    );
  }

  return (
    <div className="food-recognition-container">
      <h3>Recognized Foods</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="food-list">
        {recognizedFoods.map((food, index) => (
          <div key={index} className="food-item">
            <span className="food-name">{food.name}</span>
            <span className="confidence">
              {Math.round(food.confidence * 100)}% confidence
            </span>
            <button
              className="remove-btn"
              onClick={() => handleRemoveFood(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddFood} className="add-food-form">
        <input
          type="text"
          name="food"
          placeholder="Add a food item manually"
          className="food-input"
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default FoodRecognition; 