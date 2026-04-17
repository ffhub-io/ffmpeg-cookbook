# Subtitles

## Hardcode Subtitles (Burn-in)

Permanently burn SRT subtitles into the video:

```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt output.mp4
```

### Style Options

```bash
ffmpeg -i input.mp4 -vf "subtitles=sub.srt:force_style='FontSize=24,FontName=Arial,PrimaryColour=&HFFFFFF&'" output.mp4
```

### From URL Input

```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt -c:v libx264 -crf 23 -c:a copy output.mp4
```

## Soft Subtitles (Embedded)

Embed subtitles as a selectable track (no re-encoding needed):

```bash
ffmpeg -i input.mp4 -i sub.srt -c copy -c:s mov_text output.mp4
```

### MKV Container (supports more formats)

```bash
ffmpeg -i input.mp4 -i sub.srt -c copy -c:s srt output.mkv
```

### Multiple Subtitle Tracks

```bash
ffmpeg -i input.mp4 -i english.srt -i spanish.srt \
  -c copy -c:s mov_text \
  -metadata:s:s:0 language=eng -metadata:s:s:0 title="English" \
  -metadata:s:s:1 language=spa -metadata:s:s:1 title="Spanish" \
  output.mp4
```

## ASS/SSA Subtitles

Burn ASS subtitles (preserves styling):

```bash
ffmpeg -i input.mp4 -vf "ass=sub.ass" output.mp4
```

## Extract Subtitles

### Extract to SRT

```bash
ffmpeg -i input.mkv -map 0:s:0 output.srt
```

### Extract Specific Track

List all subtitle tracks first:

```bash
ffprobe -v error -select_streams s -show_entries stream=index,codec_name:stream_tags=language,title -of csv=p=0 input.mkv
```

Then extract by index:

```bash
ffmpeg -i input.mkv -map 0:s:1 output.srt
```

## Convert Subtitle Formats

### SRT to ASS

```bash
ffmpeg -i sub.srt sub.ass
```

### ASS to SRT

```bash
ffmpeg -i sub.ass sub.srt
```

## Subtitle Timing

### Delay Subtitles by 2 Seconds

```bash
ffmpeg -i input.mp4 -itsoffset 2 -i sub.srt -c copy -c:s mov_text output.mp4
```

### Shift with filter (burn-in)

Use `setpts` or adjust the SRT file timestamps directly.

## Common Issues

| Issue | Solution |
|-------|----------|
| Garbled characters | Add `-sub_charenc UTF-8` before subtitle input |
| Font not found | Install fonts or use `fontsdir` option |
| No subtitle stream | Check tracks with `ffprobe`, use correct `-map` |
| MKV subtitles in MP4 | Convert to mov_text: `-c:s mov_text` |
