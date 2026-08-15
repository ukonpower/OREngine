#!/usr/bin/env bash
# shader_minifier と mono をセットアップする（macOS / Linux）
# インストール先は ShaderBuilder が既定で参照するパス（~/Documents/application/shader_minifier/）。
# 別の場所を使う場合は ORENGINE_SHADER_MINIFIER で実行コマンドを上書きする（README 参照）
set -euo pipefail

# バージョンを固定して CI とローカルの packed サイズ計測条件を揃える
SM_VERSION="1.6.0"
SM_URL="https://github.com/laurentlb/shader-minifier/releases/download/${SM_VERSION}/shader_minifier.exe"
DEST_DIR="${HOME}/Documents/application/shader_minifier"
DEST="${DEST_DIR}/shader_minifier.exe"

# mono の確保
if ! command -v mono > /dev/null 2>&1; then

	case "$( uname -s )" in
		Darwin)
			if ! command -v brew > /dev/null 2>&1; then
				echo "[setup-shader-minifier] Homebrew が見つかりません。https://brew.sh からインストールしてください" >&2
				exit 1
			fi
			echo "[setup-shader-minifier] installing mono via Homebrew..."
			brew install mono
			;;
		Linux)
			echo "[setup-shader-minifier] installing mono via apt-get..."
			sudo apt-get update -qq
			sudo apt-get install -y -qq --no-install-recommends mono-devel
			;;
		*)
			echo "[setup-shader-minifier] 未対応の OS です。Windows は README の手順で shader_minifier.exe を PATH に配置してください" >&2
			exit 1
			;;
	esac

fi

# shader_minifier 本体の取得（既存ファイルは上書きしない。バージョンを変えたい場合は削除して再実行）
if [ -f "${DEST}" ]; then

	echo "[setup-shader-minifier] already exists: ${DEST}"

else

	echo "[setup-shader-minifier] downloading shader_minifier ${SM_VERSION}..."
	mkdir -p "${DEST_DIR}"
	curl -fsSL -o "${DEST}" "${SM_URL}"

fi

# 動作確認
mono "${DEST}" --version
echo "[setup-shader-minifier] OK"
