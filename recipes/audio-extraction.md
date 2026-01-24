# Audio Extraction

Extract audio tracks from video files.

## Extract as MP3

```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

**Quality options** (`-q:a`):
| Value | Bitrate (approx) | Quality |
|-------|------------------|---------|
| 0 | ~245 kbps | Best |
| 2 | ~190 kbps | High |
| 4 | ~165 kbps | Good |
| 6 | ~130 kbps | Medium |

## Extract as AAC

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.aac
```

Or in M4A container:

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.m4a
```

## Extract as WAV (Lossless)

```bash
ffmpeg -i input.mp4 -vn -c:a pcm_s16le output.wav
```

## Extract as FLAC (Lossless, Compressed)

```bash
ffmpeg -i input.mp4 -vn -c:a flac output.flac
```

## Extract as OGG (Vorbis)

```bash
ffmpeg -i input.mp4 -vn -c:a libvorbis -q:a 5 output.ogg
```

## Copy Original Audio (No Re-encoding)

Fastest method - just extracts without transcoding:

```bash
ffmpeg -i input.mp4 -vn -c:a copy output.aac
```

First check the original codec:

```bash
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## Extract Specific Time Range

```bash
# From 00:30 to 02:00
ffmpeg -i input.mp4 -vn -ss 00:00:30 -to 00:02:00 -c:a libmp3lame -q:a 2 output.mp3
```

## Extract Specific Audio Track

If video has multiple audio tracks:

```bash
# Extract second audio track (index 1)
ffmpeg -i input.mp4 -vn -map 0:a:1 -c:a libmp3lame output.mp3
```

List all tracks first:

```bash
ffprobe -v error -show_entries stream=index,codec_name,codec_type -of csv input.mp4
```

## Batch Extract from Multiple Files

```bash
for f in *.mp4; do ffmpeg -i "$f" -vn -c:a libmp3lame -q:a 2 "${f%.mp4}.mp3"; done
```
