# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy public
COPY public/ public/

# Copy .env.production first
COPY .env.production .env.production

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Set environment variables for build
ENV REACT_APP_VISION_API_ENDPOINT=https://vision.googleapis.com/v1/images:annotate
ENV REACT_APP_GOOGLE_CLOUD_API_KEY=AIzaSyASG77GAALjVqvLNnJvcJLub2Pn1HUS-r0

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built assets from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
