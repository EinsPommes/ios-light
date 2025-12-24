<img src="https://raw.githubusercontent.com/EinsPommes/ios-light/main/assets/ios-light.png">

# iOS Light

A beautiful iOS-inspired Discord theme featuring San Francisco fonts, iOS color palette, rounded corners, blur effects, and modern UI elements. Built on top of system24's modular architecture. Perfect for Vencord and BetterDiscord.

<img src="https://raw.githubusercontent.com/EinsPommes/ios-light/main/assets/screenshot.png">

## Features

- 🍎 **iOS Design Language** - Authentic iOS-inspired interface
- 🔤 **San Francisco Fonts** - Native iOS typography (SF Pro Display, SF Pro Text, SF Mono)
- 🎨 **iOS Color Palette** - Official iOS colors including iOS Blue (#007AFF)
- ✨ **Glassmorphism** - Modern blur effects and frosted glass panels
- 📐 **Rounded Corners** - iOS-style border radius throughout
- 🎯 **Smooth Animations** - iOS easing curves and transitions
- 🌈 **Status Colors** - iOS-accurate status indicators
- 🏷️ **Panel Labels** - Clean labels for UI sections (from system24)
- 🎵 **Custom Spotify Bar** - Text-like Spotify progress bar (from system24)
- 📝 **ASCII Titles** - Optional ASCII art channel titles (from system24)
- 🔄 **Modular Architecture** - Based on system24's flexible module system

## Installation

### Vencord/BetterDiscord (or any client that supports theme files)

1. Download the theme file: [`ios-light.theme.css`](https://github.com/EinsPommes/ios-light/blob/main/theme/ios-light.theme.css) (Right-click and "Save As")
2. Drag the file into your theme folder (there should be a button to open the theme folder in theme settings)
3. Enable the theme in your client settings

### Install through link

Add `https://einspommes.github.io/ios-light/theme/ios-light.theme.css` to your theme import links.

## Customization

The theme is highly customizable through CSS variables in the theme file. You can adjust:

- Fonts and typography
- Colors and accents
- Spacing and sizes
- Animations and transitions
- Panel labels (on/off)
- ASCII titles (on/off)
- Spotify bar style (on/off)
- Rounded corners (on/off)

Edit the variables in `theme/ios-light.theme.css` to customize the theme to your liking.

## Development

This theme depends on [midnight](https://github.com/refact0r/midnight-discord) for its core styles and uses [system24](https://github.com/refact0r/system24)'s modular architecture.

To run locally:

1. Clone the repository
2. Run `npm i`
3. Create a `.env` file in the project root with the paths of any local theme files you want to update (comma separated):

```
DEV_OUTPUT_PATH=C:\Users\USERNAME\AppData\Roaming\Vencord\themes\ios-light-dev.theme.css
```

4. Run `npm run dev`
5. Make changes to any file in `/src` or the main theme file. The local theme files you listed will automatically be updated, along with the build file in `/build`
6. Make a pull request with your changes!

## Project Structure

- `/src` - Source CSS modules (main.css, colors.css, ascii.css, panel-labels.css, spotify-bar.css, unrounding.css, ios.css)
- `/theme` - Theme file that imports all modules
- `/build` - Compiled CSS files
- `/assets` - Fonts and images

## Credits

- [midnight-discord](https://github.com/refact0r/midnight-discord) for core styles
- [system24](https://github.com/refact0r/system24) for modular architecture and features

## License

MIT License
