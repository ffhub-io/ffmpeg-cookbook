# サムネイル生成

動画からフレームを画像として抽出します。

## 単一フレーム

### 特定の時間で

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.jpg
```

### 高品質

```bash
# 品質：1（最高）から 31（最低）
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -q:v 2 thumbnail.jpg
```

### 最初のフレーム

```bash
ffmpeg -i input.mp4 -frames:v 1 first_frame.jpg
```

### PNG形式（ロスレス）

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 thumbnail.png
```

## 複数フレーム

### N秒ごとに

```bash
# 10秒ごと
ffmpeg -i input.mp4 -vf fps=1/10 frame_%04d.jpg

# 1秒ごと
ffmpeg -i input.mp4 -vf fps=1 frame_%04d.jpg

# 0.5秒ごと（毎秒2枚）
ffmpeg -i input.mp4 -vf fps=2 frame_%04d.jpg
```

### Nフレームごとに

```bash
# 30フレームごと
ffmpeg -i input.mp4 -vf "select=not(mod(n\,30))" -vsync vfr frame_%04d.jpg
```

### 特定の枚数

```bash
# 均等に分散した10フレームを抽出
ffmpeg -i input.mp4 -vf "select=not(mod(n\,$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4)/10))" -frames:v 10 -vsync vfr frame_%02d.jpg
```

## サムネイルのリサイズ

```bash
# 固定幅、アスペクト比を維持
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:-1 thumbnail.jpg

# 固定サイズ
ffmpeg -i input.mp4 -ss 00:00:05 -frames:v 1 -vf scale=320:180 thumbnail.jpg
```

## サムネイルグリッド（スプライトシート）

コンタクトシートを作成：

```bash
# 5x4グリッド、10秒ごとに1フレーム
ffmpeg -i input.mp4 -vf "fps=1/10,scale=160:90,tile=5x4" sprite.jpg
```

異なるグリッドサイズ：

```bash
# 4x4グリッド
ffmpeg -i input.mp4 -vf "fps=1/15,scale=200:112,tile=4x4" sprite.jpg

# 10x10グリッド（100サムネイル）
ffmpeg -i input.mp4 -vf "fps=1/5,scale=96:54,tile=10x10" sprite.jpg
```

## GIFプレビュー

### シンプルなGIF

```bash
# 10秒から始まる5秒間のGIF
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 -vf "fps=10,scale=320:-1" output.gif
```

### 高品質GIF（パレット使用）

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 \
  -vf "fps=10,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  output.gif
```

### ループGIF

```bash
# -loop 0 = 無限ループ
ffmpeg -i input.mp4 -ss 00:00:10 -t 3 \
  -vf "fps=15,scale=320:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 output.gif
```

## WebPアニメーション（GIFより優れている）

```bash
ffmpeg -i input.mp4 -ss 00:00:10 -t 5 \
  -vf "fps=15,scale=320:-1" \
  -c:v libwebp -lossless 0 -q:v 75 -loop 0 \
  output.webp
```
