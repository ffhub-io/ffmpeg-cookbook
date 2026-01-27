# 音声抽出

動画ファイルから音声トラックを抽出します。

## MP3として抽出

```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

**品質オプション** (`-q:a`)：
| 値 | ビットレート（約） | 品質 |
|------|------------------|---------|
| 0 | ~245 kbps | 最高 |
| 2 | ~190 kbps | 高 |
| 4 | ~165 kbps | 良好 |
| 6 | ~130 kbps | 中 |

## AACとして抽出

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.aac
```

またはM4Aコンテナで：

```bash
ffmpeg -i input.mp4 -vn -c:a aac -b:a 192k output.m4a
```

## WAVとして抽出（ロスレス）

```bash
ffmpeg -i input.mp4 -vn -c:a pcm_s16le output.wav
```

## FLACとして抽出（ロスレス圧縮）

```bash
ffmpeg -i input.mp4 -vn -c:a flac output.flac
```

## OGGとして抽出 (Vorbis)

```bash
ffmpeg -i input.mp4 -vn -c:a libvorbis -q:a 5 output.ogg
```

## オリジナル音声をコピー（再エンコードなし）

最速の方法 - トランスコードせずに抽出：

```bash
ffmpeg -i input.mp4 -vn -c:a copy output.aac
```

まずオリジナルのコーデックを確認：

```bash
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## 特定の時間範囲を抽出

```bash
# 00:30 から 02:00 まで
ffmpeg -i input.mp4 -vn -ss 00:00:30 -to 00:02:00 -c:a libmp3lame -q:a 2 output.mp3
```

## 特定の音声トラックを抽出

動画に複数の音声トラックがある場合：

```bash
# 2番目の音声トラックを抽出（インデックス1）
ffmpeg -i input.mp4 -vn -map 0:a:1 -c:a libmp3lame output.mp3
```

まず全てのトラックを確認：

```bash
ffprobe -v error -show_entries stream=index,codec_name,codec_type -of csv input.mp4
```

## 複数ファイルを一括抽出

```bash
for f in *.mp4; do ffmpeg -i "$f" -vn -c:a libmp3lame -q:a 2 "${f%.mp4}.mp3"; done
```
