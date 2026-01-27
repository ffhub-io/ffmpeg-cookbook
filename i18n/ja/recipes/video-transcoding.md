# 動画トランスコード

異なるフォーマットとコーデック間で動画を変換します。

## MP4 から WebM

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

## MP4 から AVI

```bash
ffmpeg -i input.mp4 -c:v mpeg4 -c:a mp3 output.avi
```

## MOV から MP4

```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

## MKV から MP4（再エンコードなし）

コーデックが互換性がある場合、ストリームをそのままコピーできます：

```bash
ffmpeg -i input.mkv -c copy output.mp4
```

## H.264 エンコード（最も互換性が高い）

```bash
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac output.mp4
```

**プリセットオプション**（速度と品質のバランス）：
- `ultrafast` - 最速エンコード、最大ファイルサイズ
- `fast` - 多くの場合に適したバランス
- `medium` - デフォルト
- `slow` - より良い圧縮、より遅い
- `veryslow` - 最高の圧縮、最も遅い

**CRF**（固定品質係数）：
- 0 = ロスレス
- 18 = 視覚的にロスレス
- 23 = デフォルト（良好な品質）
- 28 = より小さいファイル、品質低下
- 51 = 最低品質

## H.265/HEVC エンコード（より良い圧縮）

同じ品質でH.264より約50%小さいファイル：

```bash
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -c:a aac output.mp4
```

注意：H.265エンコードは遅く、すべてのプレーヤーがサポートしているわけではありません。

## AV1 エンコード（最高の圧縮、最も遅い）

```bash
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -c:a libopus output.webm
```

## Web用に変換（高速スタート対応）

```bash
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -movflags +faststart output.mp4
```

`-movflags +faststart` はメタデータをファイルの先頭に移動し、より高速なストリーミングを可能にします。

## ディレクトリ内の全ファイルを一括変換

```bash
for f in *.mov; do ffmpeg -i "$f" -c:v libx264 -c:a aac "${f%.mov}.mp4"; done
```
