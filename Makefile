.PHONY: generate gallery portfolio

generate: gallery portfolio
	@echo "✓ Gallery and portfolio updated"

gallery:
	@node scripts/generate-gallery.js

portfolio:
	@node scripts/generate-portfolio.js
