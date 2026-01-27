# 视频压缩

在保持可接受质量的同时减小视频文件体积。

## 快速压缩 (H.264)

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4
```

## 高压缩 (H.265/HEVC)

H.265 比 H.264 压缩率高约 50%：

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium -c:a aac -b:a 128k output.mp4
```

## 指定目标码率

设置目标码率（如视频 1 Mbps）：

```bash
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -c:a aac -b:a 128k output.mp4
```

## 二次编码（目标文件大小的最佳质量）

用于精确控制文件大小：

```bash
# 第一次 - 分析
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 1 -f null /dev/null

# 第二次 - 编码
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 2 -c:a aac -b:a 128k output.mp4
```

## 网页优化压缩

针对网页流媒体优化：

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## 降低分辨率 + 压缩

结合分辨率缩放以获得最大压缩：

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 24 -c:a aac output.mp4
```

## 无损压缩

仅当源文件编码效率低下时才能减小体积：

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 0 -preset veryslow output.mp4
```

## 快速检查文件大小

压缩前后对比：

```bash
# 检查文件大小
ls -lh input.mp4 output.mp4

# 检查码率
ffprobe -v error -show_entries format=bit_rate -of default=noprint_wrappers=1 input.mp4
```
