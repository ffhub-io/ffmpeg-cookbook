# 提取音频

从视频文件中提取音轨。

## 提取为 MP3

```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

**质量选项** (`-q:a`)：
| 值 | 码率（约） | 质量 |
|------|------------------|---------|
| 0 | ~245 kbps | 最佳 |
| 2 | ~190 kbps | 高 |
| 4 | ~165 kbps | 良好 |
| 6 | ~130 kbps | 中等 |

## 提取为 AAC

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.aac
```

或使用 M4A 容器：

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.m4a
```

## 提取为 WAV（无损）

```bash
ffmpeg -i input.mp4 -vn -c:a pcm_s16le output.wav
```

## 提取为 FLAC（无损压缩）

```bash
ffmpeg -i input.mp4 -vn -c:a flac output.flac
```

## 提取为 OGG (Vorbis)

```bash
ffmpeg -i input.mp4 -vn -c:a libvorbis -q:a 5 output.ogg
```

## 复制原始音频（不重新编码）

最快的方法 - 直接提取不转码：

```bash
ffmpeg -i input.mp4 -vn -c:a copy output.aac
```

先检查原始编码格式：

```bash
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## 提取特定时间范围

```bash
# 从 00:30 到 02:00
ffmpeg -i input.mp4 -vn -ss 00:00:30 -to 00:02:00 -c:a libmp3lame -q:a 2 output.mp3
```

## 提取特定音轨

如果视频有多个音轨：

```bash
# 提取第二个音轨（索引 1）
ffmpeg -i input.mp4 -vn -map 0:a:1 -c:a libmp3lame output.mp3
```

先列出所有音轨：

```bash
ffprobe -v error -show_entries stream=index,codec_name,codec_type -of csv input.mp4
```

## 批量提取多个文件

```bash
for f in *.mp4; do ffmpeg -i "$f" -vn -c:a libmp3lame -q:a 2 "${f%.mp4}.mp3"; done
```
