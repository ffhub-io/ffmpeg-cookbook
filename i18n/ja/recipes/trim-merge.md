# トリム＆結合

動画セグメントをカットし、複数の動画を連結します。

## 動画をトリム

### 開始時間と長さで

```bash
# 30秒から開始、60秒間を保持
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:01:00 -c copy output.mp4
```

### 開始と終了時間で

```bash
# 00:30 から 02:00 まで
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

### 最初のN秒

```bash
ffmpeg -i input.mp4 -t 30 -c copy output.mp4
```

### 最後のN秒

```bash
# 最後の30秒
ffmpeg -sseof -30 -i input.mp4 -c copy output.mp4
```

### 最初のN秒を削除

```bash
# 最初の10秒をスキップ
ffmpeg -i input.mp4 -ss 10 -c copy output.mp4
```

## 正確なトリミング

`-c copy`は高速ですが、キーフレームで不正確な場合があります。正確なカットには再エンコードが必要：

```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c:v libx264 -c:a aac output.mp4
```

または入力シークを使用（`-ss`を`-i`の前に配置）：

```bash
ffmpeg -ss 00:00:30 -i input.mp4 -t 00:01:30 -c copy output.mp4
```

## 動画を連結

### 方法1：Concatデマルチプレクサ（同じコーデック - 最速）

ファイル `list.txt` を作成：

```
file 'video1.mp4'
file 'video2.mp4'
file 'video3.mp4'
```

そして：

```bash
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

### 方法2：Concatフィルタ（異なるコーデック）

```bash
ffmpeg -i video1.mp4 -i video2.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" output.mp4
```

### 3つ以上の動画を結合

```bash
ffmpeg -i v1.mp4 -i v2.mp4 -i v3.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" output.mp4
```

## セグメントに分割

### 長さで

```bash
# 60秒のセグメントに分割
ffmpeg -i input.mp4 -c copy -map 0 -segment_time 60 -f segment -reset_timestamps 1 output_%03d.mp4
```

### 数で

まず長さを取得し、計算：

```bash
# 秒数での長さを取得
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input.mp4
```

## 複数のクリップを抽出

```bash
# クリップ1: 0:00-0:30
ffmpeg -i input.mp4 -ss 0 -t 30 -c copy clip1.mp4

# クリップ2: 1:00-1:30
ffmpeg -i input.mp4 -ss 60 -t 30 -c copy clip2.mp4

# クリップ3: 2:00-2:30
ffmpeg -i input.mp4 -ss 120 -t 30 -c copy clip3.mp4
```

## 中間部分を削除

開始と終了を保持し、中間を削除：

```bash
# 0-30秒と60秒-終わりを保持、30-60秒を削除
ffmpeg -i input.mp4 -t 30 -c copy part1.mp4
ffmpeg -i input.mp4 -ss 60 -c copy part2.mp4
# その後 part1 と part2 を連結
```
