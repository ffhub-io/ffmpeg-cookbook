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
- `ultrafast` - Fastest encoding, largest file
- `fast` - Good balance for most cases
- `medium` - Default
- `slow` - Better compression, slower
- `veryslow` - Best compression, slowest

**CRF** (Constant Rate Factor):
- 0 = Lossless
- 18 = Visually lossless
- 23 = Default (good quality)
- 28 = Smaller file, lower quality
- 51 = Worst quality

## H.265/HEVC Encoding (Better Compression)

~50% smaller files than H.264 at same quality:

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -c:a aac output.mp4
```

Note: H.265 encoding is slower and not all players support it.

## AV1 Encoding (Best Compression, Slowest)

```bash
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -c:a libopus output.webm
```

## Convert for Web (with fast start)

```bash
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -movflags +faststart output.mp4
```

The `-movflags +faststart` moves metadata to the beginning for faster streaming.

## Batch Convert All Files in Directory

```bash
for f in *.mov; do ffmpeg -i "$f" -c:v libx264 -c:a aac "${f%.mov}.mp4"; done
```
