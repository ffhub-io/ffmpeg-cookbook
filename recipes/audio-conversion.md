# Audio Conversion

Convert between audio formats.

## MP3 to WAV

```bash
ffmpeg -i input.mp3 -c:a pcm_s16le output.wav
```

## WAV to MP3

```bash
ffmpeg -i input.wav -c:a libmp3lame -q:a 2 output.mp3
```

## FLAC to MP3

```bash
ffmpeg -i input.flac -c:a libmp3lame -q:a 0 output.mp3
```

## MP3 to AAC

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 192k output.aac
```

## Any Format to M4A (AAC in M4A container)

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 256k output.m4a
```

## Adjust Audio Bitrate

```bash
# 320 kbps MP3
ffmpeg -i input.wav -c:a libmp3lame -b:a 320k output.mp3

# 128 kbps MP3
ffmpeg -i input.wav -c:a libmp3lame -b:a 128k output.mp3
```

## Change Sample Rate

```bash
# Convert to 44.1 kHz
ffmpeg -i input.wav -ar 44100 output.wav

# Convert to 48 kHz
ffmpeg -i input.wav -ar 48000 output.wav
```

## Mono to Stereo / Stereo to Mono

```bash
# Stereo to Mono
ffmpeg -i input.mp3 -ac 1 output.mp3

# Mono to Stereo
ffmpeg -i input.mp3 -ac 2 output.mp3
```

## Adjust Volume

```bash
# Increase volume by 50%
ffmpeg -i input.mp3 -af volume=1.5 output.mp3

# Decrease volume by 50%
ffmpeg -i input.mp3 -af volume=0.5 output.mp3

# Increase by 10dB
ffmpeg -i input.mp3 -af volume=10dB output.mp3
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) for audio conversion:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/input.flac -c:a libmp3lame -q:a 0 output.mp3"
  }'
```
