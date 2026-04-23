.PHONY: generate gallery portfolio blog

generate: gallery portfolio blog
	@echo "✓ Gallery, portfolio, and blog updated"

gallery:
	@node scripts/generate-gallery.js

portfolio:
	@node scripts/generate-portfolio.js

blog:
	@node scripts/generate-blog.js
