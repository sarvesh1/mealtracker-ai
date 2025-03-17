// Log all environment variables at startup (without exposing sensitive data)
console.log('Environment check:', {
  VISION_API_ENDPOINT: process.env.REACT_APP_VISION_API_ENDPOINT ? 'defined' : 'undefined',
  API_KEY: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY ? 'defined' : 'undefined',
  NODE_ENV: process.env.NODE_ENV,
  PUBLIC_URL: process.env.PUBLIC_URL,
  allEnvVars: Object.keys(process.env),
  // Add direct access to environment variables
  directAccess: {
    visionEndpoint: process.env.REACT_APP_VISION_API_ENDPOINT,
    apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY ? 'present' : 'missing'
  }
});

const VISION_API_ENDPOINT = process.env.REACT_APP_VISION_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;

// Add validation for environment variables
if (!VISION_API_ENDPOINT) {
  console.error('REACT_APP_VISION_API_ENDPOINT is not defined');
}
if (!API_KEY) {
  console.error('REACT_APP_GOOGLE_CLOUD_API_KEY is not defined');
}

export const analyzeFoodImage = async (imageFile) => {
  try {
    // Validate environment variables
    if (!VISION_API_ENDPOINT || !API_KEY) {
      throw new Error('Missing required environment variables for Vision API');
    }

    // Convert image to base64
    const base64Image = await convertToBase64(imageFile);
    
    // Prepare the request body
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 10
            }
          ]
        }
      ]
    };

    // Log the API endpoint (without the key)
    console.log('Making request to Vision API endpoint:', VISION_API_ENDPOINT);

    // Make API request
    const response = await fetch(`${VISION_API_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Vision API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Failed to analyze image: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter and format food-related labels
    const foodLabels = data.responses[0].labelAnnotations
      .filter(label => label.description.toLowerCase().includes('food') || 
                      label.description.toLowerCase().includes('dish') ||
                      label.description.toLowerCase().includes('meal'))
      .map(label => ({
        name: label.description,
        confidence: label.score
      }));

    return foodLabels;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Helper function to convert File to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}; 