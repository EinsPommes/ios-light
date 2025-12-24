const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// File and directory paths
const baseFile = path.join(__dirname, '..', '/theme/ios-light.theme.css');
const buildFile = path.join(__dirname, '..', '/build/ios-light.css');
const srcDir = path.join(__dirname, '..', '/src');
const outputPaths = process.env.DEV_OUTPUT_PATH ? process.env.DEV_OUTPUT_PATH.split(',') : [];

// Output paths are optional for dev mode

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

// Process the base file and replace imports with actual content
function processBaseFile(compiledCSS) {
	const baseContent = fs.readFileSync(baseFile, 'utf8');
	const importRegex = /@import\s+url\(['"]?[^'"]+['"]?\);/g;

	const processedContent = baseContent.replace(importRegex, compiledCSS);

	outputPaths.forEach((outputPath) => {
		fs.writeFileSync(outputPath, processedContent);
		console.log(`Updated ${outputPath}`);
	});
}

// Process theme file
function processThemeFile(compiledCSS) {
	if (!fs.existsSync(baseFile)) {
		return;
	}

	const themeContent = fs.readFileSync(baseFile, 'utf8');
	
	// Replace build/ios-light.css import with actual content
	const processedContent = themeContent.replace(
		/@import\s+url\(['"]?https:\/\/einspommes\.github\.io\/ios-light\/build\/ios-light\.css['"]?\);?/g,
		compiledCSS
	);

	// Also replace ios.css import if it exists
	const finalContent = processedContent.replace(
		/@import\s+url\(['"]?https:\/\/einspommes\.github\.io\/ios-light\/src\/ios\.css['"]?\);?/g,
		`/* ios.css */\n${fs.readFileSync(path.join(srcDir, 'ios.css'), 'utf8')}\n`
	);

	// Write theme to build directory
	const buildThemeFile = path.join(__dirname, '..', '/build/ios-light.theme.css');
	fs.writeFileSync(buildThemeFile, finalContent);
	console.log(`Updated ${buildThemeFile}`);
}

// Main function to process files
function processFiles() {
	try {
		const compiledCSS = combineSourceFiles();
		processThemeFile(compiledCSS);
		
		// Also update output paths if specified
		outputPaths.forEach((outputPath) => {
			const themeContent = fs.readFileSync(baseFile, 'utf8');
			const processedContent = themeContent.replace(
				/@import\s+url\(['"]?https:\/\/einspommes\.github\.io\/ios-light\/build\/ios-light\.css['"]?\);?/g,
				compiledCSS
			).replace(
				/@import\s+url\(['"]?https:\/\/einspommes\.github\.io\/ios-light\/src\/ios\.css['"]?\);?/g,
				`/* ios.css */\n${fs.readFileSync(path.join(srcDir, 'ios.css'), 'utf8')}\n`
			);
			fs.writeFileSync(outputPath, processedContent);
			console.log(`Updated ${outputPath}`);
		});
	} catch (error) {
		console.error('Error processing files:', error);
	}
}

processFiles();

// Set up watchers
const watcher = chokidar.watch([baseFile, `${srcDir}/**/*.css`], {
	ignoreInitial: true,
});

// Watch for changes
watcher
	.on('change', (filePath) => {
		console.log(`File changed: ${filePath}`);
		processFiles();
	})
	.on('add', (filePath) => {
		console.log(`New file added: ${filePath}`);
		processFiles();
	})
	.on('unlink', (filePath) => {
		console.log(`File deleted: ${filePath}`);
		processFiles();
	})
	.on('error', (error) => console.error(`Watcher error: ${error}`));
