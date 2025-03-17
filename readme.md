# MealTracker AI - Proof of Concept

A simple web application that uses AI to analyze food photos and track daily meals.

## Core Functionality

This proof of concept focuses on the essential features:

- **Photo Upload**: Upload photos of meals
- **AI Food Recognition**: Identify food items in photos
- **Basic Meal Logging**: Save meals with date and time
- **Simple Dashboard**: View your meal history

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (React)
- **AI Image Recognition**: Utilizing a pre-trained model or simple API integration
- **Local Storage**: Browser localStorage for this proof of concept

## Getting Started

### Prerequisites
- Modern web browser
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```
   git clone https://github.com/sarvesh1/mealtracker-ai.git
   ```
2. Install dependencies
   ```
   cd mealtracker-ai
   npm install
   ```
3. Start the development server
   ```
   npm start
   ```

## How It Works

1. **Take or upload a photo** of your meal
2. **AI analyzes the photo** to identify food items
3. **Save the meal** with identified foods and timestamp
4. **View your meal history** in a simple dashboard

## Project Structure

```
mealtracker-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── PhotoUpload.js
│   │   ├── FoodRecognition.js
│   │   ├── MealLog.js
│   │   └── Dashboard.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Future Enhancements

After this proof of concept, potential next steps include:
- Adding proper backend and database
- Implementing user authentication
- Adding nutritional analysis
- Creating more detailed food tracking and reporting