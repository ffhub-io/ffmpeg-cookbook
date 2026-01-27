# 添加水印

为视频添加 logo 图片或文字叠加。

## 图片水印

### 位置：右下角

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:H-h-10" output.mp4
```

### 位置：左上角

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:10" output.mp4
```

### 位置：右上角

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:10" output.mp4
```

### 位置：左下角

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:H-h-10" output.mp4
```

### 位置：居中

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=(W-w)/2:(H-h)/2" output.mp4
```

## 调整水印大小

叠加前缩放 logo：

```bash
# 将 logo 宽度缩放为 100px
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]scale=100:-1[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## 半透明水印

```bash
# 50% 不透明度
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.5[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## 文字水印

### 简单文字

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='示例文字':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### 带背景框

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='示例文字':fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=5:x=10:y=10" output.mp4
```

### 带阴影

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='示例文字':fontsize=24:fontcolor=white:shadowcolor=black:shadowx=2:shadowy=2:x=10:y=10" output.mp4
```

### 使用自定义字体

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='示例':fontfile=/path/to/font.ttf:fontsize=32:fontcolor=white:x=10:y=10" output.mp4
```

## 动态文字

### 时间戳

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{pts\:hms}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### 帧号

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='帧\: %{frame_num}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### 日期/时间

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{localtime}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

## 带淡入淡出的水印

```bash
# 前 2 秒淡入
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]fade=in:0:60[logo];[0:v][logo]overlay=10:10" output.mp4
```

## 多个水印

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=10:10[tmp];[tmp]drawtext=text='Copyright 2024':fontsize=16:fontcolor=white:x=W-tw-10:y=H-th-10" output.mp4
```
