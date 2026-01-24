# Generate Thumbnail

Extract frames from video as images.

## Single Frame at Specific Time

```bash
# Extract frame at 5 seconds
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.jpg
```

## Single Frame (High Quality)

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -q:v 2 thumbnail.jpg
```

Quality ranges from 1 (best) to 31 (worst).

## Extract First Frame

```bash
ffmpeg -i input.mp4 -frames:v 1 first_frame.jpg
```

## Extract Multiple Frames at Intervals

### Every 10 Seconds

```bash
ffmpeg -i input.mp4 -vf fps=1/10 frame_%04d.jpg
```

### Every 1 Second

```bash
ffmpeg -i input.mp4 -vf fps=1 frame_%04d.jpg
```

### Every 5 Frames

```bash
ffmpeg -i input.mp4 -vf "select=not(mod(n\,5))" -vsync vfr frame_%04d.jpg
```

## Extract as PNG (Lossless)

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.png
```

## Specific Size Thumbnail

```bash
# 320x180 thumbnail
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:180 thumbnail.jpg

# Maintain aspect ratio
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:-1 thumbnail.jpg
```

## Create Thumbnail Grid/Sprite

Create a contact sheet of frames:

```bash
ffmpeg -i input.mp4 -vf "fps=1/10,scale=160:90,tile=5x4" sprite.jpg
```

This creates a 5x4 grid (20 thumbnails), one every 10 seconds.

## Create GIF Preview

```bash
# 5-second GIF starting at 10 seconds
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 -vf "fps=10,scale=320:-1" output.gif

# Higher quality GIF with palette
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 -vf "fps=10,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) for thumbnail generation:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/video.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:-1 thumbnail.jpg"
  }'
```
