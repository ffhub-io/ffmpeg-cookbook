# Video Transcoding

Convert videos between different formats and codecs.

## MP4 to WebM

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

## MP4 to AVI

```bash
ffmpeg -i input.mp4 -c:v mpeg4 -c:a mp3 output.avi
```

## MOV to MP4

```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

## MKV to MP4 (without re-encoding)

If the codecs are compatible, you can just copy streams:

```bash
ffmpeg -i input.mkv -c copy output.mp4
```

## H.264 Encoding (Most Compatible)

```bash
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac output.mp4
```

**Preset options** (speed vs quality):
- `ultrafast` - Fastest, largest file
- `fast` - Good balance
- `medium` - Default
- `slow` - Better compression
- `veryslow` - Best compression, slowest

**CRF** (Constant Rate Factor):
- 0 = Lossless
- 18 = Visually lossless
- 23 = Default
- 28 = Smaller file, lower quality
- 51 = Worst quality

## H.265/HEVC Encoding (Better Compression)

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -c:a aac output.mp4
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) to run these commands without local setup:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/input.mov -c:v libx264 -preset fast -c:a aac output.mp4"
  }'
```
