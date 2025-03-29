# Chrome Extension Promo Generator (Web Version)

A web-based tool for generating promotional materials for Chrome Extension submissions to the Chrome Web Store.

![Chrome Extension Promo Generator](./screenshot.png)

## Features

- Generate promotional materials for Chrome Web Store submissions
- Create screenshots (1280 x 800px), small promo tiles (440 x 280px), and marquee promo banners (1400 x 560px)
- Dark mode support with theme persistence
- Easily upload your extension icon and screenshots
- Preview all generated materials before downloading
- 100% client-side processing (no data is sent to any server)

## Live Demo

Visit the live application at [https://ajaypalnitj.github.io/chrome-extension-promo-generator/](https://ajaypalnitj.github.io/chrome-extension-promo-generator/)

## Development Setup

To set up the project for local development:

```bash
# Clone the repository
git clone https://github.com/ajaypalnitj/chrome-extension-promo-generator.git
cd chrome-extension-promo-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Build for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

## Deploy to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

Note: You need to change the `homepage` in `package.json` and `base` in `vite.config.js` to match your GitHub username and repository name.

## Technologies Used

- React 18
- Vite
- Styled Components
- HTML-to-Image
- File-Saver
- React Dropzone

## License

MIT License

## Acknowledgements

- Icons from [Feather Icons](https://feathericons.com/)
- Color scheme inspired by Google's Material Design 