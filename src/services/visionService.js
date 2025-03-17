const VISION_API_ENDPOINT = process.env.REACT_APP_VISION_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;

export const analyzeFoodImage = async (imageFile) => {
  try {
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

    // Make API request
    const response = await fetch(`${VISION_API_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
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