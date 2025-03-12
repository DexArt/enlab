#!/bin/bash

# Function to check if a port is in use
is_port_in_use() {
  local port=$1
  if lsof -i :$port > /dev/null 2>&1; then
    echo "Port $port is already in use."
    return 0
  else
    return 1
  fi
}

# Function to handle errors
handle_error() {
  echo "Error: $1"
  stop_servers
  exit 1
}

# Function to stop servers
stop_servers() {
  echo "Stopping servers..."
  if [ -n "$NESTJS_PID" ]; then
    echo "Stopping NestJS server (PID: $NESTJS_PID)..."
    kill $NESTJS_PID || echo "Failed to stop NestJS server."
  fi
  if [ -n "$REACT_PID" ]; then
    echo "Stopping React server (PID: $REACT_PID)..."
    kill $REACT_PID || echo "Failed to stop React server."
  fi
}

# Build and run the NestJS backend (movie-proxy)

# Install dependencies
yarn || handle_error "Failed to install dependencies for movie-proxy and frontend"

echo "Building and running NestJS backend..."
cd movie-proxy || handle_error "Failed to navigate to movie-proxy directory"

# Build the NestJS app
yarn build || handle_error "Failed to build movie-proxy"

# Check if port 8443 is in use
if is_port_in_use 8443; then
  echo "Port 8443 is already in use. Please free the port or update the script to use a different port."
  exit 1
fi

# Run the NestJS app in the background
yarn start &
NESTJS_PID=$!

# Check if the process started successfully
if ! kill -0 $NESTJS_PID 2>/dev/null; then
  handle_error "Failed to run movie-proxy"
fi

# Navigate back to the root directory
cd ..

# Build and run the React frontend (frontend)
echo "Building and running React frontend..."
cd frontend || handle_error "Failed to navigate to frontend directory"


# Generate API client
yarn generate || handle_error "Failed to generate API client"

# Build the React app
yarn build:prod || handle_error "Failed to build frontend"

# Run the React app in the background
yarn start &
REACT_PID=$!

# Check if the process started successfully
if ! kill -0 $REACT_PID 2>/dev/null; then
  handle_error "Failed to run frontend"
fi

# Navigate back to the root directory
cd ..

# Trap to ensure servers are stopped when the script exits
trap stop_servers EXIT

# Keep the script running to keep the servers alive
wait