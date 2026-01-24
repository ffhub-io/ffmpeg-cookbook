# Generate Thumbnail

Extract frames from video as images.

## Single Frame

### At Specific Time

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.jpg
```

### High Quality

```bash
# Quality: 1 (best) to 31 (worst)
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -q:v 2 thumbnail.jpg
```

### First Frame

```bash
ffmpeg -i input.mp4 -frames:v 1 first_frame.jpg
```

### As PNG (Lossless)

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.png
```

## Multiple Frames

### Every N Seconds

```bash
# Every 10 seconds
ffmpeg -i input.mp4 -vf fps=1/10 frame_%04d.jpg

# Every 1 second
ffmpeg -i input.mp4 -vf fps=1 frame_%04d.jpg

# Every 0.5 seconds (2 per second)
ffmpeg -i input.mp4 -vf fps=2 frame_%04d.jpg
```

### Every N Frames

```bash
# Every 30 frames
ffmpeg -i input.mp4 -vf "select=not(mod(n\,30))" -vsync vfr frame_%04d.jpg
```

### Specific Number of Frames

```bash
# Extract exactly 10 frames evenly distributed
ffmpeg -i input.mp4 -vf "select=not(mod(n\,$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4)/10))" -frames:v 10 -vsync vfr frame_%02d.jpg
```

## Resize Thumbnails

```bash
# Fixed width, maintain aspect ratio
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:-1 thumbnail.jpg

# Fixed dimensions
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:180 thumbnail.jpg
```

## Thumbnail Grid (Sprite Sheet)

Create a contact sheet:

```bash
# 5x4 grid, one frame every 10 seconds
ffmpeg -i input.mp4 -vf "fps=1/10,scale=160:90,tile=5x4" sprite.jpg
```

Different grid sizes:

```bash
# 4x4 grid
ffmpeg -i input.mp4 -vf "fps=1/15,scale=200:112,tile=4x4" sprite.jpg

# 10x10 grid (100 thumbnails)
ffmpeg -i input.mp4 -vf "fps=1/5,scale=96:54,tile=10x10" sprite.jpg
```

## GIF Preview

### Simple GIF

```bash
# 5-second GIF starting at 10 seconds
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 -vf "fps=10,scale=320:-1" output.gif
```

### High Quality GIF (with palette)

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 \
  -vf "fps=10,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  output.gif
```

### Looping GIF

```bash
# -loop 0 = infinite loop
ffmpeg -i input.mp4 -ss 00:00:10 -t 3 \
  -vf "fps=15,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 output.gif
```

## WebP Animation (Better than GIF)

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 \
  -vf "fps=15,scale=320:-1" \
  -c:v libwebp -lossless 0 -q:v 75 -loop 0 \
  output.webp
```
