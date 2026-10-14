#!/bin/bash
# Persistent server keepalive script
cd /home/z/my-project
while true; do
    # Check if server is running
    if ! curl -s -o /dev/null -w "" http://localhost:3000/ 2>/dev/null; then
        echo "$(date): Starting server..."
        npx next dev -p 3000 -H 0.0.0.0 &
        SERVER_PID=$!
        echo "$(date): Server PID: $SERVER_PID"
        sleep 15
    fi
    sleep 10
done
