# 字幕処理

## ハードサブ（焼き付け）

SRT 字幕を動画に永久的に焼き付ける：

```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt output.mp4
```

### スタイルのカスタマイズ

```bash
ffmpeg -i input.mp4 -vf "subtitles=sub.srt:force_style='FontSize=24,FontName=Arial,PrimaryColour=&HFFFFFF&'" output.mp4
```

### エンコーダー指定

```bash
ffmpeg -i input.mp4 -vf subtitles=sub.srt -c:v libx264 -crf 23 -c:a copy output.mp4
```

## ソフトサブ（切り替え可能な字幕トラック）

再エンコードなしで切り替え可能な字幕トラックとして埋め込む：

```bash
ffmpeg -i input.mp4 -i sub.srt -c copy -c:s mov_text output.mp4
```

### MKV コンテナ（より多くの形式に対応）

```bash
ffmpeg -i input.mp4 -i sub.srt -c copy -c:s srt output.mkv
```

### 複数言語の字幕トラック

```bash
ffmpeg -i input.mp4 -i english.srt -i japanese.srt \
  -c copy -c:s mov_text \
  -metadata:s:s:0 language=eng -metadata:s:s:0 title="English" \
  -metadata:s:s:1 language=jpn -metadata:s:s:1 title="日本語" \
  output.mp4
```

## ASS/SSA 字幕

ASS 字幕の焼き付け（スタイリングを保持）：

```bash
ffmpeg -i input.mp4 -vf "ass=sub.ass" output.mp4
```

## 字幕の抽出

### SRT として抽出

```bash
ffmpeg -i input.mkv -map 0:s:0 output.srt
```

### 特定トラックの抽出

まず全字幕トラックを一覧表示：

```bash
ffprobe -v error -select_streams s -show_entries stream=index,codec_name:stream_tags=language,title -of csv=p=0 input.mkv
```

インデックスを指定して抽出：

```bash
ffmpeg -i input.mkv -map 0:s:1 output.srt
```

## 字幕フォーマット変換

### SRT → ASS

```bash
ffmpeg -i sub.srt sub.ass
```

### ASS → SRT

```bash
ffmpeg -i sub.ass sub.srt
```

## 字幕タイミング調整

### 字幕を 2 秒遅延

```bash
ffmpeg -i input.mp4 -itsoffset 2 -i sub.srt -c copy -c:s mov_text output.mp4
```

## よくある問題

| 問題 | 解決方法 |
|------|----------|
| 文字化け | 字幕入力の前に `-sub_charenc UTF-8` を追加 |
| フォントが見つからない | フォントをインストールするか `fontsdir` オプションを使用 |
| 字幕ストリームがない | `ffprobe` でトラックを確認し、正しい `-map` を使用 |
| MKV 字幕を MP4 へ | mov_text に変換：`-c:s mov_text` |
