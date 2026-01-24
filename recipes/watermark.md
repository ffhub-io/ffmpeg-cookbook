# Add Watermark

Add logo images or text overlays to videos.

## Image Watermark

### Bottom Right Corner

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:H-h-10" output.mp4
```

### Top Left Corner

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:10" output.mp4
```

### Top Right Corner

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:10" output.mp4
```

### Bottom Left Corner

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:H-h-10" output.mp4
```

### Center

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=(W-w)/2:(H-h)/2" output.mp4
```

## Scale Watermark

Resize logo before overlay:

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]scale=100:-1[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## Semi-Transparent Watermark

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.5[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## Text Watermark

### Simple Text

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='FFHub.io':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### Text with Background

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='FFHub.io':fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=5:x=10:y=10" output.mp4
```

### Text with Shadow

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='FFHub.io':fontsize=24:fontcolor=white:shadowcolor=black:shadowx=2:shadowy=2:x=10:y=10" output.mp4
```

### Timestamp Watermark

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{pts\:hms}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) for watermarking:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/video.mp4 -i https://example.com/logo.png -filter_complex \"overlay=W-w-10:H-h-10\" output.mp4"
  }'
```
