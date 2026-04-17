# FFmpeg Cookbook

Practical FFmpeg recipes for everyday video/audio processing tasks. No fluff, just commands that work.

**Language**: **English** | [中文](i18n/zh/README.md) | [日本語](i18n/ja/README.md)

> **Don't want to install FFmpeg?** Use [FFHub.io](https://ffhub.io) to run all these commands in the cloud via API — no local setup needed.

## Recipes

### Video
- [Video Transcoding](recipes/video-transcoding.md) - Convert between formats (MP4, WebM, AVI, MOV, MKV)
- [Video Compression](recipes/video-compression.md) - Reduce file size with H.264/H.265
- [Resolution Scaling](recipes/resolution-scaling.md) - Resize to 4K, 1080p, 720p, or custom
- [Speed Change](recipes/speed.md) - Speed up, slow motion, reverse video

### Audio
- [Audio Extraction](recipes/audio-extraction.md) - Extract audio track from video
- [Audio Conversion](recipes/audio-conversion.md) - Convert between MP3, WAV, AAC, FLAC

### Effects
- [Add Watermark](recipes/watermark.md) - Image or text overlay
- [Trim & Merge](recipes/trim-merge.md) - Cut segments and concatenate videos
- [Generate Thumbnail](recipes/thumbnail.md) - Extract frames, create GIF previews
- [Subtitles](recipes/subtitles.md) - Burn-in, embed, extract, and convert subtitles

## Quick Reference

### Get Video Info
```bash
ffprobe -v error -show_format -show_streams input.mp4
```

### Convert to MP4 (H.264)
```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

### Extract Audio
```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

### Resize to 720p
```bash
ffmpeg -i input.mp4 -vf scale=-1:720 output.mp4
```

### Trim Video
```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

### 2x Speed
```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

### Burn-in Subtitles
```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt output.mp4
```

## Installation

### macOS
```bash
brew install ffmpeg
```

### Ubuntu/Debian
```bash
sudo apt update && sudo apt install ffmpeg
```

### Windows
Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use:
```bash
winget install ffmpeg
```

### Cloud (no install)

Use [FFHub.io](https://ffhub.io) to run FFmpeg commands via API:

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"command": "ffmpeg -i https://example.com/video.mp4 -c:v libx264 output.mp4"}'
```

## Contributing

Found an error or have a useful recipe? [Open an issue](https://github.com/ffhub-io/ffmpeg-cookbook/issues) or submit a PR!

## Resources

- [FFmpeg Official Documentation](https://ffmpeg.org/documentation.html)
- [FFmpeg Wiki](https://trac.ffmpeg.org/wiki)
- [FFHub.io](https://ffhub.io) - Run FFmpeg in the cloud via API (no local installation needed)

## License

MIT
