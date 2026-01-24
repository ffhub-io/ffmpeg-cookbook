# Audio Conversion

Convert between audio formats.

## Common Conversions

### MP3 to WAV

```bash
ffmpeg -i input.mp3 -c:a pcm_s16le output.wav
```

### WAV to MP3

```bash
ffmpeg -i input.wav -c:a libmp3lame -q:a 2 output.mp3
```

### FLAC to MP3

```bash
ffmpeg -i input.flac -c:a libmp3lame -q:a 0 output.mp3
```

### MP3 to AAC

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 192k output.aac
```

### Any to M4A

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 256k output.m4a
```

### OGG to MP3

```bash
ffmpeg -i input.ogg -c:a libmp3lame -q:a 2 output.mp3
```

## Bitrate Control

### Constant Bitrate (CBR)

```bash
ffmpeg -i input.wav -c:a libmp3lame -b:a 320k output.mp3
ffmpeg -i input.wav -c:a libmp3lame -b:a 192k output.mp3
ffmpeg -i input.wav -c:a libmp3lame -b:a 128k output.mp3
```

### Variable Bitrate (VBR) - Recommended

```bash
# Quality 0 (best) to 9 (worst)
ffmpeg -i input.wav -c:a libmp3lame -q:a 0 output.mp3
```

## Sample Rate

```bash
# Convert to 44.1 kHz (CD quality)
ffmpeg -i input.wav -ar 44100 output.wav

# Convert to 48 kHz (video standard)
ffmpeg -i input.wav -ar 48000 output.wav

# Convert to 22.05 kHz (smaller file)
ffmpeg -i input.wav -ar 22050 output.wav
```

## Channels

```bash
# Stereo to Mono
ffmpeg -i input.mp3 -ac 1 output.mp3

# Mono to Stereo
ffmpeg -i input.mp3 -ac 2 output.mp3
```

## Volume Adjustment

```bash
# Increase by 50%
ffmpeg -i input.mp3 -af volume=1.5 output.mp3

# Decrease by 50%
ffmpeg -i input.mp3 -af volume=0.5 output.mp3

# Increase by 10dB
ffmpeg -i input.mp3 -af volume=10dB output.mp3

# Decrease by 5dB
ffmpeg -i input.mp3 -af volume=-5dB output.mp3
```

## Normalize Volume

```bash
# Detect max volume
ffmpeg -i input.mp3 -af volumedetect -f null /dev/null

# Normalize to 0dB peak
ffmpeg -i input.mp3 -af loudnorm output.mp3
```

## Trim Audio

```bash
# First 30 seconds
ffmpeg -i input.mp3 -t 30 output.mp3

# From 1:00 to 2:30
ffmpeg -i input.mp3 -ss 00:01:00 -to 00:02:30 output.mp3
```

## Merge Audio Files

```bash
# Create file list
echo "file 'track1.mp3'" > list.txt
echo "file 'track2.mp3'" >> list.txt

# Concatenate
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp3
```
