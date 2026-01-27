# 音声変換

異なる音声フォーマット間で変換します。

## よくある変換

### MP3 から WAV

```bash
ffmpeg -i input.mp3 -c:a pcm_s16le output.wav
```

### WAV から MP3

```bash
ffmpeg -i input.wav -c:a libmp3lame -q:a 2 output.mp3
```

### FLAC から MP3

```bash
ffmpeg -i input.flac -c:a libmp3lame -q:a 0 output.mp3
```

### MP3 から AAC

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 192k output.aac
```

### 任意のフォーマットから M4A

```bash
ffmpeg -i input.mp3 -c:a aac -b:a 256k output.m4a
```

### OGG から MP3

```bash
ffmpeg -i input.ogg -c:a libmp3lame -q:a 2 output.mp3
```

## ビットレート制御

### 固定ビットレート (CBR)

```bash
ffmpeg -i input.wav -c:a libmp3lame -b:a 320k output.mp3
ffmpeg -i input.wav -c:a libmp3lame -b:a 192k output.mp3
ffmpeg -i input.wav -c:a libmp3lame -b:a 128k output.mp3
```

### 可変ビットレート (VBR) - 推奨

```bash
# 品質 0（最高）から 9（最低）
ffmpeg -i input.wav -c:a libmp3lame -q:a 0 output.mp3
```

## サンプルレート

```bash
# 44.1 kHzに変換（CD品質）
ffmpeg -i input.wav -ar 44100 output.wav

# 48 kHzに変換（動画標準）
ffmpeg -i input.wav -ar 48000 output.wav

# 22.05 kHzに変換（より小さいファイル）
ffmpeg -i input.wav -ar 22050 output.wav
```

## チャンネル

```bash
# ステレオをモノラルに
ffmpeg -i input.mp3 -ac 1 output.mp3

# モノラルをステレオに
ffmpeg -i input.mp3 -ac 2 output.mp3
```

## 音量調整

```bash
# 50%増加
ffmpeg -i input.mp3 -af volume=1.5 output.mp3

# 50%減少
ffmpeg -i input.mp3 -af volume=0.5 output.mp3

# 10dB増加
ffmpeg -i input.mp3 -af volume=10dB output.mp3

# 5dB減少
ffmpeg -i input.mp3 -af volume=-5dB output.mp3
```

## 音量正規化

```bash
# 最大音量を検出
ffmpeg -i input.mp3 -af volumedetect -f null /dev/null

# 0dBピークに正規化
ffmpeg -i input.mp3 -af loudnorm output.mp3
```

## 音声をトリム

```bash
# 最初の30秒
ffmpeg -i input.mp3 -t 30 output.mp3

# 1:00 から 2:30 まで
ffmpeg -i input.mp3 -ss 00:01:00 -to 00:02:30 output.mp3
```

## 音声ファイルを結合

```bash
# ファイルリストを作成
echo "file 'track1.mp3'" > list.txt
echo "file 'track2.mp3'" >> list.txt

# 連結
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp3
```
