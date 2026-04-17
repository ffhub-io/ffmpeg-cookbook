# Speed Change

## Speed Up Video

### 2x Speed (with audio)

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

### 4x Speed

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.25*PTS[v];[0:a]atempo=2.0,atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

> `atempo` supports 0.5–2.0 range. For 4x, chain two `atempo=2.0` filters.

### Speed Up Video Only (drop audio)

```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -an output.mp4
```

## Slow Motion

### 0.5x Speed (half speed)

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=2.0*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### 0.25x Speed (quarter speed)

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=4.0*PTS[v];[0:a]atempo=0.5,atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### Slow Motion Without Audio

```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" -an output.mp4
```

## Speed Reference

| Speed | `setpts` | `atempo` |
|-------|----------|----------|
| 0.25x | `4.0*PTS` | `atempo=0.5,atempo=0.5` |
| 0.5x | `2.0*PTS` | `atempo=0.5` |
| 1.5x | `0.667*PTS` | `atempo=1.5` |
| 2x | `0.5*PTS` | `atempo=2.0` |
| 3x | `0.333*PTS` | `atempo=2.0,atempo=1.5` |
| 4x | `0.25*PTS` | `atempo=2.0,atempo=2.0` |

> Formula: `setpts = (1 / speed) * PTS`

## Audio Speed Only

### Speed Up Audio

```bash
ffmpeg -i input.mp3 -af "atempo=1.5" output.mp3
```

### Slow Down Audio

```bash
ffmpeg -i input.mp3 -af "atempo=0.75" output.mp3
```

## Smooth Slow Motion (Frame Interpolation)

Generate intermediate frames for smoother slow motion using `minterpolate`:

```bash
ffmpeg -i input.mp4 -vf "minterpolate=fps=60,setpts=2.0*PTS" -an output.mp4
```

> `minterpolate` is CPU-intensive. Best for short clips.

## Speed Change for a Segment

Speed up only seconds 10–20, keep the rest normal:

```bash
ffmpeg -i input.mp4 -filter_complex \
  "[0:v]trim=0:10,setpts=PTS-STARTPTS[v1]; \
   [0:v]trim=10:20,setpts=0.5*(PTS-STARTPTS)[v2]; \
   [0:v]trim=20,setpts=PTS-STARTPTS[v3]; \
   [v1][v2][v3]concat=n=3:v=1:a=0[v]" \
  -map "[v]" -an output.mp4
```

## Reverse Video

```bash
ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4
```

### Reverse Video Only (no audio)

```bash
ffmpeg -i input.mp4 -vf reverse -an output.mp4
```

> Warning: `reverse` loads the entire video into memory. Use on short clips only.
