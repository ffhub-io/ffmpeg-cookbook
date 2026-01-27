# 解像度変更

動画を異なる解像度にリサイズします。

## よく使う解像度

### 1080p (フルHD)

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:a copy output.mp4
```

### 720p (HD)

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:a copy output.mp4
```

### 480p (SD)

```bash
ffmpeg -i input.mp4 -vf scale=854:480 -c:a copy output.mp4
```

### 4K (UHD)

```bash
ffmpeg -i input.mp4 -vf scale=3840:2160 -c:a copy output.mp4
```

## アスペクト比を維持

`-1`を使用して片方の寸法を自動計算：

```bash
# 幅を1280に設定、高さを自動計算
ffmpeg -i input.mp4 -vf scale=1280:-1 -c:a copy output.mp4

# 高さを720に設定、幅を自動計算
ffmpeg -i input.mp4 -vf scale=-1:720 -c:a copy output.mp4
```

## 偶数寸法を強制

一部のコーデック（H.264など）は偶数寸法が必要です。`-2`を使用：

```bash
ffmpeg -i input.mp4 -vf scale=1280:-2 -c:a copy output.mp4
```

## パーセンテージでスケーリング

```bash
# 50%にスケーリング
ffmpeg -i input.mp4 -vf scale=iw/2:ih/2 -c:a copy output.mp4

# 200%に拡大
ffmpeg -i input.mp4 -vf scale=iw*2:ih*2 -c:a copy output.mp4
```

## 高品質スケーリング

より良い品質のためにlanczosアルゴリズムを使用：

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080:flags=lanczos -c:a copy output.mp4
```

## ボックス内にフィット（アスペクト比を維持）

アスペクト比を維持しながら1280x720内に収める：

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease" -c:a copy output.mp4
```

## パディングを追加（レターボックス/ピラーボックス）

スケーリングして正確な寸法になるよう黒帯を追加：

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:a copy output.mp4
```

## スケーリングの代わりにクロップ

リサイズではなく端を削除：

```bash
# 中央から1920x1080にクロップ
ffmpeg -i input.mp4 -vf "crop=1920:1080" -c:a copy output.mp4

# オフセット付きでクロップ (x=100, y=50)
ffmpeg -i input.mp4 -vf "crop=1920:1080:100:50" -c:a copy output.mp4
```
