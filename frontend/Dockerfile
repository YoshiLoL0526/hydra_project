FROM node:22-slim

WORKDIR /app

# Copy package files and lock file
COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application with environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "3000"]