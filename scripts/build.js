const fs = require('fs');
const path = require('path');

// File and directory paths
const baseFile = path.join(__dirname, '..', '/theme/ios-light.theme.css');
const buildFile = path.join(__dirname, '..', '/build/ios-light.css');
const srcDir = path.join(__dirname, '..', '/src');

// Combine all CSS files from the source directory
function combineSourceFiles() {
	let combinedCSS = '';

	// Get all CSS files
	const allFiles = fs
		.readdirSync(srcDir)
		.filter((file) => file.endsWith('.css'))
		.map((file) => path.join(srcDir, file));

	// Split into main.css and other files
	const mainFile = allFiles.find((file) => path.basename(file) === 'main.css');
	const otherFiles = allFiles.filter((file) => path.basename(file) !== 'main.css');

	// Process main.css first if it exists
	if (mainFile) {
		const mainContent = fs.readFileSync(mainFile, 'utf8');
		combinedCSS += `/* ${path.basename(mainFile)} */\n${mainContent}\n`;
	}

	// Then process other files
	otherFiles.forEach((file) => {
		const content = fs.readFileSync(file, 'utf8');
		combinedCSS += `/* ${path.basename(file)} */\n${content}\n`;
	});

	fs.writeFileSync(buildFile, combinedCSS);
	return combinedCSS;
}

// Process theme file
function processThemeFile(compiledCSS) {
	if (!fs.existsSync(baseFile)) {
		return;
	}

	const themeContent = fs.readFileSync(baseFile, 'utf8');
	
	// Replace build/ios-light.css import with actual content (like system24 does)
	const processedContent = themeContent.replace(
		/@import\s+url\(['"]?https:\/\/raw\.githubusercontent\.com\/EinsPommes\/ios-light\/main\/build\/ios-light\.css['"]?\);?/g,
		compiledCSS
	);

	// Write theme to build directory
	const buildThemeFile = path.join(__dirname, '..', '/build/ios-light.theme.css');
	fs.writeFileSync(buildThemeFile, processedContent);
	console.log(`Built ${buildThemeFile}`);
}

// Main function to process files
function build() {
	try {
		console.log('Building theme...');
		const compiledCSS = combineSourceFiles();
		processThemeFile(compiledCSS);
		console.log('Build complete!');
	} catch (error) {
		console.error('Error building files:', error);
		process.exit(1);
	}
}

build();
