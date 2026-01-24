# Resolution Scaling

Resize videos to different resolutions.

## Scale to Specific Resolution

### 1080p (Full HD)

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:a copy output.mp4
```

### 720p (HD)

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:a copy output.mp4
```

### 480p (SD)

```bash
ffmpeg -i input.mp4 -vf scale=854:480 -c:a copy output.mp4
```

### 4K (UHD)

```bash
ffmpeg -i input.mp4 -vf scale=3840:2160 -c:a copy output.mp4
```

## Maintain Aspect Ratio

Use `-1` to auto-calculate one dimension:

```bash
# Scale width to 1280, auto-calculate height
ffmpeg -i input.mp4 -vf scale=1280:-1 -c:a copy output.mp4

# Scale height to 720, auto-calculate width
ffmpeg -i input.mp4 -vf scale=-1:720 -c:a copy output.mp4
```

## Force Even Dimensions

Some codecs require even dimensions. Use `-2` instead of `-1`:

```bash
ffmpeg -i input.mp4 -vf scale=1280:-2 -c:a copy output.mp4
```

## Scale by Percentage

Scale to 50% of original:

```bash
ffmpeg -i input.mp4 -vf scale=iw/2:ih/2 -c:a copy output.mp4
```

Scale to 200% (double size):

```bash
ffmpeg -i input.mp4 -vf scale=iw*2:ih*2 -c:a copy output.mp4
```

## High-Quality Scaling

Use lanczos algorithm for better quality:

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080:flags=lanczos -c:a copy output.mp4
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) for batch scaling:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/input.mp4 -vf scale=1280:720:flags=lanczos -c:v libx264 -crf 23 output.mp4"
  }'
```
