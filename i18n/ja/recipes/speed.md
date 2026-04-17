# 速度変更

## 動画の高速化

### 2 倍速（音声付き）

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

### 4 倍速

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.25*PTS[v];[0:a]atempo=2.0,atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

> `atempo` は 0.5〜2.0 の範囲のみ対応。4 倍速にするには `atempo=2.0` を 2 つ連結します。

### 映像のみ高速化（音声なし）

```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -an output.mp4
```

## スローモーション

### 0.5 倍速（半分の速度）

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=2.0*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### 0.25 倍速（4 分の 1 の速度）

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=4.0*PTS[v];[0:a]atempo=0.5,atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### 音声なしスローモーション

```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" -an output.mp4
```

## 速度リファレンス

| 速度 | `setpts` | `atempo` |
|------|----------|----------|
| 0.25x | `4.0*PTS` | `atempo=0.5,atempo=0.5` |
| 0.5x | `2.0*PTS` | `atempo=0.5` |
| 1.5x | `0.667*PTS` | `atempo=1.5` |
| 2x | `0.5*PTS` | `atempo=2.0` |
| 3x | `0.333*PTS` | `atempo=2.0,atempo=1.5` |
| 4x | `0.25*PTS` | `atempo=2.0,atempo=2.0` |

> 計算式：`setpts = (1 / 速度倍率) * PTS`

## 音声のみ速度変更

### 音声を高速化

```bash
ffmpeg -i input.mp3 -af "atempo=1.5" output.mp3
```

### 音声をスロー再生

```bash
ffmpeg -i input.mp3 -af "atempo=0.75" output.mp3
```

## なめらかなスローモーション（フレーム補間）

`minterpolate` で中間フレームを生成し、より滑らかなスロー効果を実現：

```bash
ffmpeg -i input.mp4 -vf "minterpolate=fps=60,setpts=2.0*PTS" -an output.mp4
```

> `minterpolate` は CPU 負荷が高いため、短いクリップでの使用を推奨します。

## 部分的な速度変更

10〜20 秒の区間のみ 2 倍速、他はそのまま：

```bash
ffmpeg -i input.mp4 -filter_complex \
  "[0:v]trim=0:10,setpts=PTS-STARTPTS[v1]; \
   [0:v]trim=10:20,setpts=0.5*(PTS-STARTPTS)[v2]; \
   [0:v]trim=20,setpts=PTS-STARTPTS[v3]; \
   [v1][v2][v3]concat=n=3:v=1:a=0[v]" \
  -map "[v]" -an output.mp4
```

## 逆再生

```bash
ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4
```

### 映像のみ逆再生（音声なし）

```bash
ffmpeg -i input.mp4 -vf reverse -an output.mp4
```

> 注意：`reverse` は動画全体をメモリに読み込みます。短いクリップにのみ使用してください。
