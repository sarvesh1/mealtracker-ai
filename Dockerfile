# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy public
COPY public/ public/

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Set build arguments
ARG REACT_APP_VISION_API_ENDPOINT
ARG REACT_APP_GOOGLE_CLOUD_API_KEY

# Set environment variables for build time
ENV REACT_APP_VISION_API_ENDPOINT=${REACT_APP_VISION_API_ENDPOINT}
ENV REACT_APP_GOOGLE_CLOUD_API_KEY=${REACT_APP_GOOGLE_CLOUD_API_KEY}

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
