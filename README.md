# wrens.widgets

Ceramic Arts Portfolio

Main Page - https://reenapetrick.github.io/wrens.widgets/

Next Steps -

- Working contact form - Formspree?
- Gallery
- About me blurb
- brownser tab image logo
- fix the image cropping for gallery
- fix brown logo background removal

## Gallery build

Gallery images are loaded dynamically from `resources/gallery/` via `gallery/gallery.json`.

To regenerate the JSON index after adding/removing images:

```bash
node scripts/generate-gallery.js
```

## Contact form

Contact form is implemented using FormSubmit.co
