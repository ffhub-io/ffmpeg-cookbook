# Audio Extraction

Extract audio tracks from video files.

## Extract as MP3

```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

**Quality options** (`-q:a`):
- 0 = Best quality (~245 kbps)
- 2 = High quality (~190 kbps)
- 4 = Good quality (~165 kbps)
- 6 = Medium quality (~130 kbps)

## Extract as AAC

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.aac
```

## Extract as WAV (Lossless)

```bash
ffmpeg -i input.mp4 -vn -c:a pcm_s16le output.wav
```

## Extract as FLAC (Lossless, Compressed)

```bash
ffmpeg -i input.mp4 -vn -c:a flac output.flac
```

## Extract as OGG

```bash
ffmpeg -i input.mp4 -vn -c:a libvorbis -q:a 5 output.ogg
```

## Copy Original Audio (No Re-encoding)

If you just want to extract without re-encoding:

```bash
# Extract as original format (auto-detect)
ffmpeg -i input.mp4 -vn -c:a copy output.aac

# Check original codec first
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## Extract Specific Time Range

```bash
# Extract audio from 00:30 to 02:00
ffmpeg -i input.mp4 -vn -ss 00:00:30 -to 00:02:00 -c:a libmp3lame output.mp3
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) - audio extraction is very fast and cost-effective:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/video.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3"
  }'
```
