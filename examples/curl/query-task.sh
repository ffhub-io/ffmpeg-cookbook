#!/bin/bash

# FFHub API - Query Task Example
# https://ffhub.io

API_KEY="YOUR_API_KEY"
TASK_ID="task_abc123"

# Query task status
curl "https://api.ffhub.io/v1/tasks/$TASK_ID" \
  -H "Authorization: Bearer $API_KEY"
