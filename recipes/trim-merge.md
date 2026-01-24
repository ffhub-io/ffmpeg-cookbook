# Trim & Merge

Cut video segments and concatenate multiple videos.

## Trim Video

### By Start Time and Duration

```bash
# Start at 30 seconds, duration 60 seconds
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:01:00 -c copy output.mp4
```

### By Start and End Time

```bash
# From 00:30 to 02:00
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

### First N Seconds

```bash
# First 30 seconds
ffmpeg -i input.mp4 -t 30 -c copy output.mp4
```

### Last N Seconds

```bash
# Last 30 seconds (requires knowing total duration)
ffmpeg -sseof -30 -i input.mp4 -c copy output.mp4
```

## Accurate Trimming (Re-encode)

Using `-c copy` is fast but may have inaccurate start/end points. For precise cuts:

```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c:v libx264 -c:a aac output.mp4
```

## Merge/Concatenate Videos

### Method 1: Concat Demuxer (Same Codec)

Create a file list `files.txt`:

```
file 'video1.mp4'
file 'video2.mp4'
file 'video3.mp4'
```

Then run:

```bash
ffmpeg -f concat -safe 0 -i files.txt -c copy output.mp4
```

### Method 2: Concat Filter (Different Codecs)

```bash
ffmpeg -i video1.mp4 -i video2.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" output.mp4
```

### Merge 3 Videos

```bash
ffmpeg -i v1.mp4 -i v2.mp4 -i v3.mp4 -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -map "[v]" -map "[a]" output.mp4
```

## Split Video into Segments

### By Duration

Split into 60-second segments:

```bash
ffmpeg -i input.mp4 -c copy -map 0 -segment_time 60 -f segment -reset_timestamps 1 output_%03d.mp4
```

### By Size (approximate)

```bash
ffmpeg -i input.mp4 -c copy -map 0 -fs 10M -f segment output_%03d.mp4
```

## Run in the Cloud

Use [FFHub API](https://ffhub.io) for trimming and merging:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ffmpeg -i https://example.com/video.mp4 -ss 00:00:30 -to 00:02:00 -c:v libx264 output.mp4"
  }'
```
