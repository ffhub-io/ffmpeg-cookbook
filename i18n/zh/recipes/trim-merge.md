# 裁剪与合并

剪切视频片段并拼接多个视频。

## 裁剪视频

### 按起始时间和时长

```bash
# 从 30 秒开始，保留 60 秒
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:01:00 -c copy output.mp4
```

### 按起始和结束时间

```bash
# 从 00:30 到 02:00
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

### 前 N 秒

```bash
ffmpeg -i input.mp4 -t 30 -c copy output.mp4
```

### 后 N 秒

```bash
# 最后 30 秒
ffmpeg -sseof -30 -i input.mp4 -c copy output.mp4
```

### 移除前 N 秒

```bash
# 跳过前 10 秒
ffmpeg -i input.mp4 -ss 10 -c copy output.mp4
```

## 精确裁剪

使用 `-c copy` 速度快但在关键帧处可能不精确。要精确剪切需要重新编码：

```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c:v libx264 -c:a aac output.mp4
```

或使用输入定位（将 `-ss` 放在 `-i` 之前）：

```bash
ffmpeg -ss 00:00:30 -i input.mp4 -t 00:01:30 -c copy output.mp4
```

## 拼接视频

### 方法 1：Concat 分离器（相同编码 - 最快）

创建文件 `list.txt`：

```
file 'video1.mp4'
file 'video2.mp4'
file 'video3.mp4'
```

然后：

```bash
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

### 方法 2：Concat 滤镜（不同编码）

```bash
ffmpeg -i video1.mp4 -i video2.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" output.mp4
```

### 合并 3 个以上视频

```bash
ffmpeg -i v1.mp4 -i v2.mp4 -i v3.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" output.mp4
```

## 分割为片段

### 按时长

```bash
# 分割为 60 秒的片段
ffmpeg -i input.mp4 -c copy -map 0 -segment_time 60 -f segment -reset_timestamps 1 output_%03d.mp4
```

### 按数量

先获取时长，然后计算：

```bash
# 获取秒数时长
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## 提取多个片段

```bash
# 片段 1: 0:00-0:30
ffmpeg -i input.mp4 -ss 0 -t 30 -c copy clip1.mp4

# 片段 2: 1:00-1:30
ffmpeg -i input.mp4 -ss 60 -t 30 -c copy clip2.mp4

# 片段 3: 2:00-2:30
ffmpeg -i input.mp4 -ss 120 -t 30 -c copy clip3.mp4
```

## 移除中间部分

保留开头和结尾，移除中间：

```bash
# 保留 0-30秒 和 60秒-结尾，移除 30-60秒
ffmpeg -i input.mp4 -t 30 -c copy part1.mp4
ffmpeg -i input.mp4 -ss 60 -c copy part2.mp4
# 然后拼接 part1 和 part2
```
