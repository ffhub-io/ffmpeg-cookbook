#!/bin/bash

# FFHub API - Create Task Example
# https://ffhub.io

API_KEY="YOUR_API_KEY"
API_URL="https://api.ffhub.io/v1/tasks"

# Create a video transcoding task
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/input.mp4 -c:v libx264 -preset fast -c:a aac output.mp4"
  }'
