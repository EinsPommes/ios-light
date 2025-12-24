<img src="https://raw.githubusercontent.com/EinsPommes/ios-light/main/assets/ios-light.png">

# iOS Light

A Discord theme that looks like iOS. Uses San Francisco fonts, iOS colors, rounded corners, blur effects, and all that good stuff. Built on top of system24's modular setup. Works with Vencord and BetterDiscord.

<img src="https://raw.githubusercontent.com/EinsPommes/ios-light/main/assets/screenshot.png">

## Installation

### Vencord/BetterDiscord

1. Download [`ios-light.theme.css`](https://github.com/EinsPommes/ios-light/blob/main/theme/ios-light.theme.css) (right-click and save)
2. Drag it into your theme folder (there's usually a button in theme settings to open the folder)
3. Enable it in your client settings

### Install via link

Add `https://einspommes.github.io/ios-light/theme/ios-light.theme.css` to your theme import links.

## Available themes

- **[iOS Light](theme/ios-light.theme.css)** - Light iOS theme (default)
- **[iOS Dark](theme/ios-dark.theme.css)** - Dark iOS theme with black background
- **[iOS 26](theme/ios-26.theme.css)** - iOS 26 theme with enhanced blur effects and modern features

## Customization

You can customize pretty much everything through CSS variables in the theme file. Change fonts, colors, spacing, animations, toggle panel labels, ASCII titles, Spotify bar style, rounded corners, etc.

Just edit the variables in `theme/ios-light.theme.css` to your liking.

## Development

This theme uses [midnight](https://github.com/refact0r/midnight-discord) for the base styles and [system24](https://github.com/refact0r/system24)'s modular architecture.

To work on it locally:

1. Clone the repo
2. Run `npm i`
3. Create a `.env` file in the project root with paths to local theme files (comma separated):

```
DEV_OUTPUT_PATH=C:\Users\USERNAME\AppData\Roaming\Vencord\themes\ios-light-dev.theme.css
```

4. Run `npm run dev`
5. Make changes to files in `/src` or the theme file. Your local theme files will update automatically, along with the build file in `/build`
6. Submit a pull request with your changes

## Project structure

- `/src` - CSS modules (main.css, colors.css, ascii.css, panel-labels.css, spotify-bar.css, unrounding.css, ios.css)
- `/theme` - Theme files that import all modules
- `/build` - Compiled CSS files
- `/assets` - Fonts and images

## Credits

- [midnight-discord](https://github.com/refact0r/midnight-discord) for the base styles
- [system24](https://github.com/refact0r/system24) for the modular architecture and features

## License

MIT License
