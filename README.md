# FFmpeg Cookbook

A collection of practical FFmpeg recipes for common video/audio processing tasks.

> Powered by [FFHub.io](https://ffhub.io) - Run FFmpeg in the Cloud

## Recipes

### Video
- [Video Transcoding](recipes/video-transcoding.md) - Convert between formats (MP4, WebM, AVI, etc.)
- [Video Compression](recipes/video-compression.md) - Reduce file size with different codecs
- [Resolution Scaling](recipes/resolution-scaling.md) - Resize to 4K, 1080p, 720p, etc.

### Audio
- [Audio Extraction](recipes/audio-extraction.md) - Extract audio track from video
- [Audio Conversion](recipes/audio-conversion.md) - Convert between audio formats

### Effects
- [Add Watermark](recipes/watermark.md) - Add logo or text overlay
- [Trim & Merge](recipes/trim-merge.md) - Cut and concatenate videos
- [Generate Thumbnail](recipes/thumbnail.md) - Extract frames as images

## Run in the Cloud

Don't want to install FFmpeg locally? Use [FFHub API](https://ffhub.io):

```bash
curl -X POST https://api.ffhub.io/v1/tasks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"command": "ffmpeg -i input.mp4 -c:v libx264 output.mp4"}'
```

**Why FFHub?**
- No server setup, no dependencies
- Always latest FFmpeg version
- Pay only for processing time (per second billing)
- Auto-scaling infrastructure

[Get Started Free](https://ffhub.io) | [API Documentation](https://ffhub.io/docs)

## Contributing

Found an issue or have a recipe to share?

- [Open an issue](https://github.com/ffhub-io/ffmpeg-cookbook/issues) for bug reports or questions
- Submit a PR with your recipe

## License

MIT
