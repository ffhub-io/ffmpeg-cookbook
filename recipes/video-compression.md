# Video Compression

Reduce video file size while maintaining acceptable quality.

## Quick Compression (H.264)

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4
```

## High Compression (H.265/HEVC)

H.265 provides ~50% better compression than H.264:

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium -c:a aac -b:a 128k output.mp4
```

## Reduce Bitrate

Set a target bitrate (e.g., 1 Mbps for video):

```bash
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -c:a aac -b:a 128k output.mp4
```

## Two-Pass Encoding (Best Quality at Target Size)

For a target file size, use two-pass encoding:

```bash
# Pass 1
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 1 -f null /dev/null

# Pass 2
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 2 -c:a aac -b:a 128k output.mp4
```

## Compress for Web

Optimized for web streaming:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4
```

The `-movflags +faststart` flag moves metadata to the beginning for faster streaming start.

## Reduce Resolution + Compress

Combine with resolution scaling:

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 24 -c:a aac output.mp4
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) for heavy compression tasks:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/input.mp4 -c:v libx265 -crf 28 -preset medium -c:a aac output.mp4"
  }'
```
