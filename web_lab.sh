#!/bin/bash

# Function to start the application
start_app() {
  echo "Starting the application..."
  docker-compose up -d
  docker ps
  echo "Application started!"
}

# Function to stop the application
stop_app() {
  echo "Stopping the application..."
  # Save the current working directory
  current_dir=$PWD
  # Loop through each directory in api/vulnerabilities and stop the Docker containers
  for folder in $PWD/api/vulnerabilities/*/; do
    echo "Stopping services in $folder"
    if cd "$folder" && docker-compose ps | grep "Up" >/dev/null; then
      cd "$folder" && docker-compose down --volumes --remove-orphans
    fi
  done
  # Go back to the original directory and stop the Docker containers
  echo "Stopping main service in $current_dir\n"
  cd "$current_dir" && docker-compose down --volumes --remove-orphans
  docker ps
  echo "Application stopped!"
}

# Function to restart the application
restart_app() {
  echo "Restarting the application..."
  stop_app
  start_app
  echo "Application restarted!"
}

# Check if the "action" argument is provided
if [ -z "$1" ]; then
  echo "Invalid action. Please provide either start, stop or restart."
  echo "Example: web_lab.sh start/stop/restart."
  exit 1
fi

# Determine which action to take
case "$1" in
start)
  start_app
  ;;
stop)
  stop_app
  ;;
restart)
  restart_app
  ;;
*)
  echo "Invalid action. Please provide either start, stop or restart."
  echo "Example: web_lab.sh start/stop/restart."
  exit 1
  ;;
esac
