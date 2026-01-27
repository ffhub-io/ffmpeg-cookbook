# ウォーターマーク追加

動画にロゴ画像またはテキストオーバーレイを追加します。

## 画像ウォーターマーク

### 位置：右下

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:H-h-10" output.mp4
```

### 位置：左上

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:10" output.mp4
```

### 位置：右上

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=W-w-10:10" output.mp4
```

### 位置：左下

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:H-h-10" output.mp4
```

### 位置：中央

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=(W-w)/2:(H-h)/2" output.mp4
```

## ウォーターマークのリサイズ

オーバーレイ前にロゴをスケーリング：

```bash
# ロゴの幅を100pxにスケーリング
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]scale=100:-1[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## 半透明ウォーターマーク

```bash
# 50%の不透明度
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.5[logo];[0:v][logo]overlay=W-w-10:H-h-10" output.mp4
```

## テキストウォーターマーク

### シンプルなテキスト

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='サンプルテキスト':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### 背景ボックス付き

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='サンプルテキスト':fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=5:x=10:y=10" output.mp4
```

### 影付き

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='サンプルテキスト':fontsize=24:fontcolor=white:shadowcolor=black:shadowx=2:shadowy=2:x=10:y=10" output.mp4
```

### カスタムフォントを使用

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='サンプル':fontfile=/path/to/font.ttf:fontsize=32:fontcolor=white:x=10:y=10" output.mp4
```

## 動的テキスト

### タイムスタンプ

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{pts\:hms}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### フレーム番号

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='フレーム\: %{frame_num}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

### 日付/時刻

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='%{localtime}':fontsize=24:fontcolor=white:x=10:y=10" output.mp4
```

## フェードイン/アウト付きウォーターマーク

```bash
# 最初の2秒でフェードイン
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]fade=in:0:60[logo];[0:v][logo]overlay=10:10" output.mp4
```

## 複数のウォーターマーク

```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=10:10[tmp];[tmp]drawtext=text='Copyright 2024':fontsize=16:fontcolor=white:x=W-tw-10:y=H-th-10" output.mp4
```
