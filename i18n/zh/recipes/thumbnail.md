# 生成缩略图

从视频中提取帧作为图片。

## 单帧

### 指定时间

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.jpg
```

### 高质量

```bash
# 质量：1（最佳）到 31（最差）
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -q:v 2 thumbnail.jpg
```

### 第一帧

```bash
ffmpeg -i input.mp4 -frames:v 1 first_frame.jpg
```

### PNG 格式（无损）

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.png
```

## 多帧

### 每 N 秒一帧

```bash
# 每 10 秒
ffmpeg -i input.mp4 -vf fps=1/10 frame_%04d.jpg

# 每 1 秒
ffmpeg -i input.mp4 -vf fps=1 frame_%04d.jpg

# 每 0.5 秒（每秒 2 帧）
ffmpeg -i input.mp4 -vf fps=2 frame_%04d.jpg
```

### 每 N 帧一张

```bash
# 每 30 帧
ffmpeg -i input.mp4 -vf "select=not(mod(n\,30))" -vsync vfr frame_%04d.jpg
```

### 指定帧数

```bash
# 均匀提取 10 帧
ffmpeg -i input.mp4 -vf "select=not(mod(n\,$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4)/10))" -frames:v 10 -vsync vfr frame_%02d.jpg
```

## 调整缩略图大小

```bash
# 固定宽度，保持宽高比
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:-1 thumbnail.jpg

# 固定尺寸
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:180 thumbnail.jpg
```

## 缩略图网格（雪碧图）

创建联系表：

```bash
# 5x4 网格，每 10 秒一帧
ffmpeg -i input.mp4 -vf "fps=1/10,scale=160:90,tile=5x4" sprite.jpg
```

不同网格大小：

```bash
# 4x4 网格
ffmpeg -i input.mp4 -vf "fps=1/15,scale=200:112,tile=4x4" sprite.jpg

# 10x10 网格（100 个缩略图）
ffmpeg -i input.mp4 -vf "fps=1/5,scale=96:54,tile=10x10" sprite.jpg
```

## GIF 预览

### 简单 GIF

```bash
# 从第 10 秒开始的 5 秒 GIF
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 -vf "fps=10,scale=320:-1" output.gif
```

### 高质量 GIF（使用调色板）

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 \
  -vf "fps=10,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  output.gif
```

### 循环 GIF

```bash
# -loop 0 = 无限循环
ffmpeg -i input.mp4 -ss 00:00:10 -t 3 \
  -vf "fps=15,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 output.gif
```

## WebP 动画（比 GIF 更好）

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 \
  -vf "fps=15,scale=320:-1" \
  -c:v libwebp -lossless 0 -q:v 75 -loop 0 \
  output.webp
```
