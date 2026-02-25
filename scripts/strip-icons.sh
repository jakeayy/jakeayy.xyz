ICONS=$(python3 -c "import sys; print(','.join(f'U+{ord(c):04x}' for c in set(open('fetch.txt').read()) if ord(c) > 32))")
pyftsubset nerd-fonts.ttf --unicodes="$ICONS" --flavor=woff2 --output-file=nerd-font.woff2
