# Resolution Scaling

Resize videos to different resolutions.

## Common Resolutions

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

Some codecs (like H.264) require even dimensions. Use `-2`:

```bash
ffmpeg -i input.mp4 -vf scale=1280:-2 -c:a copy output.mp4
```

## Scale by Percentage

```bash
# Scale to 50%
ffmpeg -i input.mp4 -vf scale=iw/2:ih/2 -c:a copy output.mp4

# Scale to 200%
ffmpeg -i input.mp4 -vf scale=iw*2:ih*2 -c:a copy output.mp4
```

## High-Quality Scaling

Use lanczos algorithm for better quality:

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080:flags=lanczos -c:a copy output.mp4
```

## Fit Inside Box (Preserve Aspect Ratio)

Scale to fit within 1280x720 while keeping aspect ratio:

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease" -c:a copy output.mp4
```

## Add Padding (Letterbox/Pillarbox)

Scale and add black bars to exact dimensions:

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:a copy output.mp4
```

## Crop Instead of Scale

Remove edges instead of resizing:

```bash
# Crop to 1920x1080 from center
ffmpeg -i input.mp4 -vf "crop=1920:1080" -c:a copy output.mp4

# Crop with offset (x=100, y=50)
ffmpeg -i input.mp4 -vf "crop=1920:1080:100:50" -c:a copy output.mp4
```
