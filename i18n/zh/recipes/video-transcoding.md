# 视频转码

在不同格式和编码之间转换视频。

## MP4 转 WebM

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

## MP4 转 AVI

```bash
ffmpeg -i input.mp4 -c:v mpeg4 -c:a mp3 output.avi
```

## MOV 转 MP4

```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

## MKV 转 MP4（不重新编码）

如果编码格式兼容，可以直接复制流：

```bash
ffmpeg -i input.mkv -c copy output.mp4
```

## H.264 编码（兼容性最佳）

```bash
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac output.mp4
```

**预设选项**（速度与质量的平衡）：
- `ultrafast` - 最快编码，文件最大
- `fast` - 大多数情况下的好选择
- `medium` - 默认值
- `slow` - 更好的压缩，更慢
- `veryslow` - 最佳压缩，最慢

**CRF**（恒定质量因子）：
- 0 = 无损
- 18 = 视觉无损
- 23 = 默认（良好质量）
- 28 = 文件更小，质量较低
- 51 = 最差质量

## H.265/HEVC 编码（更好的压缩）

相同质量下文件比 H.264 小约 50%：

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -c:a aac output.mp4
```

注意：H.265 编码较慢，且不是所有播放器都支持。

## AV1 编码（最佳压缩，最慢）

```bash
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -c:a libopus output.webm
```

## 转换为网页格式（快速启动）

```bash
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -movflags +faststart output.mp4
```

`-movflags +faststart` 将元数据移到文件开头，以加快流媒体播放。

## 批量转换目录中的所有文件

```bash
for f in *.mov; do ffmpeg -i "$f" -c:v libx264 -c:a aac "${f%.mov}.mp4"; done
```
