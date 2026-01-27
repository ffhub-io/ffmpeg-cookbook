# FFmpeg 使用手册

实用的 FFmpeg 命令集，用于日常视频/音频处理任务。没有废话，只有能用的命令。

**语言**: [English](../../README.md) | **中文** | [日本語](../ja/README.md)

## 目录

### 视频
- [视频转码](recipes/video-transcoding.md) - 格式转换 (MP4, WebM, AVI, MOV, MKV)
- [视频压缩](recipes/video-compression.md) - 使用 H.264/H.265 减小文件体积
- [分辨率调整](recipes/resolution-scaling.md) - 调整为 4K, 1080p, 720p 或自定义分辨率

### 音频
- [提取音频](recipes/audio-extraction.md) - 从视频中提取音轨
- [音频转换](recipes/audio-conversion.md) - 在 MP3, WAV, AAC, FLAC 之间转换

### 效果
- [添加水印](recipes/watermark.md) - 图片或文字叠加
- [裁剪与合并](recipes/trim-merge.md) - 剪切片段和拼接视频
- [生成缩略图](recipes/thumbnail.md) - 提取帧、创建 GIF 预览

## 快速参考

### 获取视频信息
```bash
ffprobe -v error -show_format -show_streams input.mp4
```

### 转换为 MP4 (H.264)
```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

### 提取音频
```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

### 调整为 720p
```bash
ffmpeg -i input.mp4 -vf scale=-1:720 output.mp4
```

### 裁剪视频
```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

## 安装

### macOS
```bash
brew install ffmpeg
```

### Ubuntu/Debian
```bash
sudo apt update && sudo apt install ffmpeg
```

### Windows
从 [ffmpeg.org](https://ffmpeg.org/download.html) 下载，或使用：
```bash
winget install ffmpeg
```

## 贡献

发现错误或有实用的命令？[提交 issue](https://github.com/sinancode-com/ffmpeg-cookbook/issues) 或提交 PR！

## 资源

- [FFmpeg 官方文档](https://ffmpeg.org/documentation.html)
- [FFmpeg Wiki](https://trac.ffmpeg.org/wiki)
- [FFHub.io](https://ffhub.io) - 通过 API 在云端运行 FFmpeg（无需本地安装）

## 许可证

MIT
