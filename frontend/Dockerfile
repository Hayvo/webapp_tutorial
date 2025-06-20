# Use Node.js to build the React app
FROM node:20 as builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the entire frontend directory
COPY frontend ./frontend

# Change working directory to frontend
WORKDIR /app/frontend

# Build the React app
RUN npm run build

# Use an Nginx server to serve the built files
FROM nginx:alpine

# Copy the built React app to Nginx's default public folder
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Optional: Add custom Nginx config for React SPA routing
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
