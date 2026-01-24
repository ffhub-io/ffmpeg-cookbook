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

## Target Specific Bitrate

Set a target bitrate (e.g., 1 Mbps for video):

```bash
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -c:a aac -b:a 128k output.mp4
```

## Two-Pass Encoding (Best Quality at Target Size)

For precise file size control:

```bash
# Pass 1 - analyze
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 1 -f null /dev/null

# Pass 2 - encode
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 2 -c:a aac -b:a 128k output.mp4
```

## Compress for Web

Optimized for web streaming:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## Reduce Resolution + Compress

Combine with resolution scaling for maximum compression:

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 24 -c:a aac output.mp4
```

## Compress Without Quality Loss (Lossless)

Only reduces file size if source has inefficient encoding:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 0 -preset veryslow output.mp4
```

## Quick Size Check

Before and after compression:

```bash
# Check file size
ls -lh input.mp4 output.mp4

# Check bitrate
ffprobe -v error -show_entries format=bit_rate -of default=noprint_wrappers=1 input.mp4
```
