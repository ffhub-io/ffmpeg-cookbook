# Trim & Merge

Cut video segments and concatenate multiple videos.

## Trim Video

### By Start Time and Duration

```bash
# Start at 30 seconds, keep 60 seconds
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:01:00 -c copy output.mp4
```

### By Start and End Time

```bash
# From 00:30 to 02:00
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

### First N Seconds

```bash
ffmpeg -i input.mp4 -t 30 -c copy output.mp4
```

### Last N Seconds

```bash
# Last 30 seconds
ffmpeg -sseof -30 -i input.mp4 -c copy output.mp4
```

### Remove First N Seconds

```bash
# Skip first 10 seconds
ffmpeg -i input.mp4 -ss 10 -c copy output.mp4
```

## Accurate Trimming

Using `-c copy` is fast but may be inaccurate at keyframes. For precise cuts, re-encode:

```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c:v libx264 -c:a aac output.mp4
```

Or use input seeking (put `-ss` before `-i`):

```bash
ffmpeg -ss 00:00:30 -i input.mp4 -t 00:01:30 -c copy output.mp4
```

## Concatenate Videos

### Method 1: Concat Demuxer (Same Codec - Fastest)

Create a file `list.txt`:

```
file 'video1.mp4'
file 'video2.mp4'
file 'video3.mp4'
```

Then:

```bash
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

### Method 2: Concat Filter (Different Codecs)

```bash
ffmpeg -i video1.mp4 -i video2.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" output.mp4
```

### Merge 3+ Videos

```bash
ffmpeg -i v1.mp4 -i v2.mp4 -i v3.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" output.mp4
```

## Split into Segments

### By Duration

```bash
# Split into 60-second segments
ffmpeg -i input.mp4 -c copy -map 0 -segment_time 60 -f segment -reset_timestamps 1 output_%03d.mp4
```

### By Number of Parts

First get duration, then calculate:

```bash
# Get duration in seconds
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## Extract Multiple Clips

```bash
# Clip 1: 0:00-0:30
ffmpeg -i input.mp4 -ss 0 -t 30 -c copy clip1.mp4

# Clip 2: 1:00-1:30
ffmpeg -i input.mp4 -ss 60 -t 30 -c copy clip2.mp4

# Clip 3: 2:00-2:30
ffmpeg -i input.mp4 -ss 120 -t 30 -c copy clip3.mp4
```

## Remove Middle Section

Keep beginning and end, remove middle:

```bash
# Keep 0-30s and 60s-end, remove 30-60s
ffmpeg -i input.mp4 -t 30 -c copy part1.mp4
ffmpeg -i input.mp4 -ss 60 -c copy part2.mp4
# Then concatenate part1 and part2
```
