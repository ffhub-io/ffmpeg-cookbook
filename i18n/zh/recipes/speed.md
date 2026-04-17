# 变速处理

## 加速视频

### 2 倍速（含音频）

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

### 4 倍速

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.25*PTS[v];[0:a]atempo=2.0,atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

> `atempo` 支持 0.5–2.0 范围。4 倍速需要串联两个 `atempo=2.0` 滤镜。

### 仅加速画面（丢弃音频）

```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -an output.mp4
```

## 慢动作

### 0.5 倍速（半速）

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=2.0*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### 0.25 倍速（四分之一速）

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=4.0*PTS[v];[0:a]atempo=0.5,atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### 慢动作不含音频

```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" -an output.mp4
```

## 速度参考表

| 速度 | `setpts` | `atempo` |
|------|----------|----------|
| 0.25x | `4.0*PTS` | `atempo=0.5,atempo=0.5` |
| 0.5x | `2.0*PTS` | `atempo=0.5` |
| 1.5x | `0.667*PTS` | `atempo=1.5` |
| 2x | `0.5*PTS` | `atempo=2.0` |
| 3x | `0.333*PTS` | `atempo=2.0,atempo=1.5` |
| 4x | `0.25*PTS` | `atempo=2.0,atempo=2.0` |

> 公式：`setpts = (1 / 倍速) * PTS`

## 仅调整音频速度

### 加速音频

```bash
ffmpeg -i input.mp3 -af "atempo=1.5" output.mp3
```

### 减速音频

```bash
ffmpeg -i input.mp3 -af "atempo=0.75" output.mp3
```

## 平滑慢动作（帧插值）

使用 `minterpolate` 生成中间帧，获得更流畅的慢动作效果：

```bash
ffmpeg -i input.mp4 -vf "minterpolate=fps=60,setpts=2.0*PTS" -an output.mp4
```

> `minterpolate` 非常消耗 CPU，建议仅用于短片段。

## 局部变速

仅加速第 10–20 秒，其余部分保持原速：

```bash
ffmpeg -i input.mp4 -filter_complex \
  "[0:v]trim=0:10,setpts=PTS-STARTPTS[v1]; \
   [0:v]trim=10:20,setpts=0.5*(PTS-STARTPTS)[v2]; \
   [0:v]trim=20,setpts=PTS-STARTPTS[v3]; \
   [v1][v2][v3]concat=n=3:v=1:a=0[v]" \
  -map "[v]" -an output.mp4
```

## 倒放视频

```bash
ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4
```

### 仅倒放画面（无音频）

```bash
ffmpeg -i input.mp4 -vf reverse -an output.mp4
```

> 注意：`reverse` 会将整个视频加载到内存，仅适用于短片段。
