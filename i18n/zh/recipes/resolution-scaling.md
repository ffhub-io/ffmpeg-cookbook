# 分辨率调整

调整视频到不同分辨率。

## 常用分辨率

### 1080p (全高清)

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:a copy output.mp4
```

### 720p (高清)

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:a copy output.mp4
```

### 480p (标清)

```bash
ffmpeg -i input.mp4 -vf scale=854:480 -c:a copy output.mp4
```

### 4K (超高清)

```bash
ffmpeg -i input.mp4 -vf scale=3840:2160 -c:a copy output.mp4
```

## 保持宽高比

使用 `-1` 自动计算一个维度：

```bash
# 宽度设为 1280，自动计算高度
ffmpeg -i input.mp4 -vf scale=1280:-1 -c:a copy output.mp4

# 高度设为 720，自动计算宽度
ffmpeg -i input.mp4 -vf scale=-1:720 -c:a copy output.mp4
```

## 强制偶数尺寸

某些编码器（如 H.264）需要偶数尺寸。使用 `-2`：

```bash
ffmpeg -i input.mp4 -vf scale=1280:-2 -c:a copy output.mp4
```

## 按百分比缩放

```bash
# 缩放到 50%
ffmpeg -i input.mp4 -vf scale=iw/2:ih/2 -c:a copy output.mp4

# 放大到 200%
ffmpeg -i input.mp4 -vf scale=iw*2:ih*2 -c:a copy output.mp4
```

## 高质量缩放

使用 lanczos 算法获得更好的质量：

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080:flags=lanczos -c:a copy output.mp4
```

## 适应边框（保持宽高比）

缩放以适应 1280x720 同时保持宽高比：

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease" -c:a copy output.mp4
```

## 添加填充（信箱/柱箱模式）

缩放并添加黑边以达到精确尺寸：

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:a copy output.mp4
```

## 裁剪而不是缩放

移除边缘而不是调整大小：

```bash
# 从中心裁剪为 1920x1080
ffmpeg -i input.mp4 -vf "crop=1920:1080" -c:a copy output.mp4

# 带偏移量裁剪 (x=100, y=50)
ffmpeg -i input.mp4 -vf "crop=1920:1080:100:50" -c:a copy output.mp4
```
