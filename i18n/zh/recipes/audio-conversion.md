# 音频转换

在不同音频格式之间转换。

## 常见转换

### MP3 转 WAV

```bash
ffmpeg -i input.mp3 -c:a pcm_s16le output.wav
```

### WAV 转 MP3

```bash
ffmpeg -i input.wav -c:a libmp3lame -q:a 2 output.mp3
```

### FLAC 转 MP3

```bash
ffmpeg -i input.flac -c:a libmp3lame -q:a 0 output.mp3
```

### MP3 转 AAC

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 192k output.aac
```

### 任意格式转 M4A

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 256k output.m4a
```

### OGG 转 MP3

```bash
ffmpeg -i input.ogg -c:a libmp3lame -q:a 2 output.mp3
```

## 码率控制

### 恒定码率 (CBR)

```bash
ffmpeg -i input.wav -c:a libmp3lame -b:a 320k output.mp3
ffmpeg -i input.wav -c:a libmp3lame -b:a 192k output.mp3
ffmpeg -i input.wav -c:a libmp3lame -b:a 128k output.mp3
```

### 可变码率 (VBR) - 推荐

```bash
# 质量 0（最佳）到 9（最差）
ffmpeg -i input.wav -c:a libmp3lame -q:a 0 output.mp3
```

## 采样率

```bash
# 转换为 44.1 kHz（CD 质量）
ffmpeg -i input.wav -ar 44100 output.wav

# 转换为 48 kHz（视频标准）
ffmpeg -i input.wav -ar 48000 output.wav

# 转换为 22.05 kHz（较小文件）
ffmpeg -i input.wav -ar 22050 output.wav
```

## 声道

```bash
# 立体声转单声道
ffmpeg -i input.mp3 -ac 1 output.mp3

# 单声道转立体声
ffmpeg -i input.mp3 -ac 2 output.mp3
```

## 音量调整

```bash
# 增加 50%
ffmpeg -i input.mp3 -af volume=1.5 output.mp3

# 减少 50%
ffmpeg -i input.mp3 -af volume=0.5 output.mp3

# 增加 10dB
ffmpeg -i input.mp3 -af volume=10dB output.mp3

# 减少 5dB
ffmpeg -i input.mp3 -af volume=-5dB output.mp3
```

## 音量标准化

```bash
# 检测最大音量
ffmpeg -i input.mp3 -af volumedetect -f null /dev/null

# 标准化到 0dB 峰值
ffmpeg -i input.mp3 -af loudnorm output.mp3
```

## 裁剪音频

```bash
# 前 30 秒
ffmpeg -i input.mp3 -t 30 output.mp3

# 从 1:00 到 2:30
ffmpeg -i input.mp3 -ss 00:01:00 -to 00:02:30 output.mp3
```

## 合并音频文件

```bash
# 创建文件列表
echo "file 'track1.mp3'" > list.txt
echo "file 'track2.mp3'" >> list.txt

# 拼接
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp3
```
