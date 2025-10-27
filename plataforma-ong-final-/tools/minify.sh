#!/usr/bin/env bash
# Script de exemplo para minificação (requer npx e ferramentas instaladas)
set -e
echo "Minificando CSS..."
# npx clean-css-cli -o css/design-system.min.css css/design-system.css
echo "Minificando JS..."
# npx terser js/app.js -o js/app.min.js --compress --mangle
echo "Minificando HTML..."
# npx html-minifier --collapse-whitespace --remove-comments -o index.min.html index.html
echo "Converter imagens para WebP (exemplo)..."
# for img in images/*.{jpg,png}; do npx cwebp -q 80 "$img" -o "${img%.*}.webp"; done
echo "Script concluído (descomente as linhas e instale as ferramentas)."
