#!/bin/bash

command=$1
action=$2
timeout=30

if [ "$command" == "" ] || [ "$action" == "" ]; then
  echo "Usage: ./start-container.sh <command> <action>"
  exit 1
fi

if [ "$action" == "start" ]; then
  eval "cd /app/vulnerabilities/$command; docker-compose up --build -d"
  start_time=$(date +%s)
  while true; do
    ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${command}_web 2>/dev/null)
    if [ "$ip" != "" ]; then
      port=$(docker-compose port web 80 | awk -F: '{print $2}')
      url="http://$ip:$port"
      echo "Container is ready at $url"
      break
    fi

    sleep 1
    curr_time=$(date +%s)
    if [ $((curr_time - start_time)) -gt $timeout ]; then
      echo "Timeout: container took too long to start"
      exit 1
    fi
  done
elif [ "$action" == "stop" ]; then
  eval "cd /app/vulnerabilities/$command; docker-compose down"
  echo "Container is stopped"
else
  echo "Invalid action: $action"
  exit 1
fi