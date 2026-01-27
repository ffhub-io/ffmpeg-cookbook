# 動画圧縮

許容できる品質を維持しながらファイルサイズを削減します。

## クイック圧縮 (H.264)

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4
```

## 高圧縮 (H.265/HEVC)

H.265はH.264より約50%高い圧縮率：

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium -c:a aac -b:a 128k output.mp4
```

## 特定のビットレートを指定

目標ビットレートを設定（例：動画1 Mbps）：

```bash
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -c:a aac -b:a 128k output.mp4
```

## 2パスエンコード（目標サイズで最高品質）

正確なファイルサイズ制御のため：

```bash
# パス1 - 分析
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 1 -f null /dev/null

# パス2 - エンコード
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -pass 2 -c:a aac -b:a 128k output.mp4
```

## Web向け最適化圧縮

Webストリーミング用に最適化：

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## 解像度低下 + 圧縮

最大圧縮のために解像度スケーリングと組み合わせ：

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 24 -c:a aac output.mp4
```

## ロスレス圧縮

ソースの非効率なエンコードを削減する場合のみファイルサイズが縮小：

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 0 -preset veryslow output.mp4
```

## クイックサイズチェック

圧縮前後の比較：

```bash
# ファイルサイズを確認
ls -lh input.mp4 output.mp4

# ビットレートを確認
ffprobe -v error -show_entries format=bit_rate -of default=noprint_wrappers=1 input.mp4
```
