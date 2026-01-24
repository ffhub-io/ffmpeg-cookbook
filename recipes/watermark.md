# Add Watermark

Add logo images or text overlays to videos.

## Image Watermark

### Position: Bottom Right

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:H-h-10" output.mp4
```

### Position: Top Left

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:10" output.mp4
```

### Position: Top Right

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:10" output.mp4
```

### Position: Bottom Left

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:H-h-10" output.mp4
```

### Position: Center

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=(W-w)/2:(H-h)/2" output.mp4
```

## Resize Watermark

Scale logo before overlaying:

```bash
# Scale logo to 100px width
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]scale=100:-1[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## Semi-Transparent Watermark

```bash
# 50% opacity
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.5[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## Text Watermark

### Simple Text

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Sample Text':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### With Background Box

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Sample Text':fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=5:x=10:y=10" output.mp4
```

### With Shadow

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Sample Text':fontsize=24:fontcolor=white:shadowcolor=black:shadowx=2:shadowy=2:x=10:y=10" output.mp4
```

### Using Custom Font

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Sample':fontfile=/path/to/font.ttf:fontsize=32:fontcolor=white:x=10:y=10" output.mp4
```

## Dynamic Text

### Timestamp

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{pts\:hms}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### Frame Number

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Frame\: %{frame_num}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### Date/Time

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{localtime}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

## Watermark with Fade In/Out

```bash
# Fade in during first 2 seconds
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]fade=in:0:60[logo];[0:v][logo]overlay=10:10" output.mp4
```

## Multiple Watermarks

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=10:10[tmp];[tmp]drawtext=text='Copyright 2024':fontsize=16:fontcolor=white:x=W-tw-10:y=H-th-10" output.mp4
```
