# 字幕处理

## 硬字幕（烧录到画面）

将 SRT 字幕永久烧录到视频中：

```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt output.mp4
```

### 自定义样式

```bash
ffmpeg -i input.mp4 -vf "subtitles=sub.srt:force_style='FontSize=24,FontName=Arial,PrimaryColour=&HFFFFFF&'" output.mp4
```

### 指定编码器

```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt -c:v libx264 -crf 23 -c:a copy output.mp4
```

## 软字幕（嵌入可选轨道）

将字幕作为可切换的轨道嵌入（无需重新编码）：

```bash
ffmpeg -i input.mp4 -i sub.srt -c copy -c:s mov_text output.mp4
```

### MKV 容器（支持更多格式）

```bash
ffmpeg -i input.mp4 -i sub.srt -c copy -c:s srt output.mkv
```

### 多语言字幕轨道

```bash
ffmpeg -i input.mp4 -i english.srt -i chinese.srt \
  -c copy -c:s mov_text \
  -metadata:s:s:0 language=eng -metadata:s:s:0 title="English" \
  -metadata:s:s:1 language=chi -metadata:s:s:1 title="中文" \
  output.mp4
```

## ASS/SSA 字幕

烧录 ASS 字幕（保留特效样式）：

```bash
ffmpeg -i input.mp4 -vf "ass=sub.ass" output.mp4
```

## 提取字幕

### 提取为 SRT

```bash
ffmpeg -i input.mkv -map 0:s:0 output.srt
```

### 提取指定轨道

先列出所有字幕轨道：

```bash
ffprobe -v error -select_streams s -show_entries stream=index,codec_name:stream_tags=language,title -of csv=p=0 input.mkv
```

按索引提取：

```bash
ffmpeg -i input.mkv -map 0:s:1 output.srt
```

## 字幕格式转换

### SRT 转 ASS

```bash
ffmpeg -i sub.srt sub.ass
```

### ASS 转 SRT

```bash
ffmpeg -i sub.ass sub.srt
```

## 字幕时间调整

### 延迟字幕 2 秒

```bash
ffmpeg -i input.mp4 -itsoffset 2 -i sub.srt -c copy -c:s mov_text output.mp4
```

## 常见问题

| 问题 | 解决方法 |
|------|----------|
| 字幕乱码 | 在字幕输入前添加 `-sub_charenc UTF-8` |
| 找不到字体 | 安装字体或使用 `fontsdir` 选项 |
| 没有字幕流 | 用 `ffprobe` 检查轨道，使用正确的 `-map` |
| MKV 字幕到 MP4 | 转换为 mov_text：`-c:s mov_text` |
