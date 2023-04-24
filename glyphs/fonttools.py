import subprocess

subprocess.run(['python', '-m', 'fontTools.subset', 'APPLESDGOTHICNEOM.woff2', '--flavor=woff2', '--layout-features="*"', '--glyph-names', '--symbol-cmap', '--legacy-cmap', '--notdef-glyph', '--no-hinting', '--notdef-outline', '--recommended-glyphs','--name-legacy','--drop-tables=','--name-IDs="*"','--name-languages="*"','--output-file=./subset-font.woff2', '--text-file=./glyphs.txt'])
