const fs = require('fs');
const path = require('path');

const rootDirectory = __dirname; // Directory of the script as the root
const includedDirectories = ['src', 'cypress', '.seo']; // Directories to include recursively
const includedExtensions = ['.ts', '.scss', '.html', '.json', '.gitignore']; // Extensions to include
const excludedFiles = ['package-lock.json']; // Files to exclude
const outputFile = path.join(rootDirectory, 'plain-sources-14.txt');

function writeContentToFile(filePath) {
  const content = fs.readFileSync(filePath, { encoding: 'utf8' });
  const fileInfo = `File Path: ${filePath}\nFile Name: ${path.basename(filePath)}\nFile Content:\n${content}\n\n`;
  fs.appendFileSync(outputFile, fileInfo);
}

function readDirectoryRecursively(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const fileExtension = path.extname(fullPath);

    if (isDirectory) {
      readDirectoryRecursively(fullPath); // Recursively read subdirectories
    } else if (includedExtensions.includes(fileExtension) && !excludedFiles.includes(file)) {
      writeContentToFile(fullPath); // Process files with specified extensions
    }
  });
}

// Clear the output file or create it if it doesn't exist
fs.writeFileSync(outputFile, '');

// Process files directly in the root directory
fs.readdirSync(rootDirectory).forEach(file => {
  const fullPath = path.join(rootDirectory, file);
  const isDirectory = fs.statSync(fullPath).isDirectory();
  const fileExtension = path.extname(fullPath);

  if (!isDirectory && includedExtensions.includes(fileExtension) && !excludedFiles.includes(file)) {
    writeContentToFile(fullPath); // Process files in the root directory
  }
});

// Process the specified directories recursively
includedDirectories.forEach(dir => {
  const dirPath = path.join(rootDirectory, dir);
  if (fs.existsSync(dirPath)) {
    readDirectoryRecursively(dirPath);
  }
});

console.log(`All files have been written to ${outputFile}`);
