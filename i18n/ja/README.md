# FFmpeg クックブック

日常的な動画/音声処理タスクのための実用的なFFmpegレシピ集。余計な説明はなし、使えるコマンドだけ。

**言語**: [English](../../README.md) | [中文](../zh/README.md) | **日本語**

## 目次

### 動画
- [動画トランスコード](recipes/video-transcoding.md) - フォーマット変換 (MP4, WebM, AVI, MOV, MKV)
- [動画圧縮](recipes/video-compression.md) - H.264/H.265でファイルサイズを削減
- [解像度変更](recipes/resolution-scaling.md) - 4K, 1080p, 720p、またはカスタム解像度に変更

### 音声
- [音声抽出](recipes/audio-extraction.md) - 動画から音声トラックを抽出
- [音声変換](recipes/audio-conversion.md) - MP3, WAV, AAC, FLAC間の変換

### エフェクト
- [ウォーターマーク追加](recipes/watermark.md) - 画像またはテキストオーバーレイ
- [トリム＆結合](recipes/trim-merge.md) - セグメントのカットと動画の連結
- [サムネイル生成](recipes/thumbnail.md) - フレーム抽出、GIFプレビュー作成

## クイックリファレンス

### 動画情報を取得
```bash
ffprobe -v error -show_format -show_streams input.mp4
```

### MP4に変換 (H.264)
```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

### 音声を抽出
```bash
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 2 output.mp3
```

### 720pにリサイズ
```bash
ffmpeg -i input.mp4 -vf scale=-1:720 output.mp4
```

### 動画をトリム
```bash
ffmpeg -i input.mp4 -ss 00:00:30 -to 00:02:00 -c copy output.mp4
```

## インストール

### macOS
```bash
brew install ffmpeg
```

### Ubuntu/Debian
```bash
sudo apt update && sudo apt install ffmpeg
```

### Windows
[ffmpeg.org](https://ffmpeg.org/download.html)からダウンロード、または：
```bash
winget install ffmpeg
```

## 貢献

エラーを見つけた、または便利なレシピがある場合は、[Issue を作成](https://github.com/ffhub-io/ffmpeg-cookbook/issues)するか PR を送ってください！

## リソース

- [FFmpeg 公式ドキュメント](https://ffmpeg.org/documentation.html)
- [FFmpeg Wiki](https://trac.ffmpeg.org/wiki)
- [FFHub.io](https://ffhub.io) - API経由でクラウド上でFFmpegを実行（ローカルインストール不要）

## ライセンス

MIT
