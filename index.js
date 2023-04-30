const fs = require('fs');
const path = require('path');

// Shit Ass Change Later I Tired


const scanDirectory = (directory, scraperList) => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      scanDirectory(path.join(directory, entry.name), scraperList);
    } else if (entry.isFile() && entry.name.endsWith('.js') && !entry.name.endsWith('index.js')) {
      const scraper = require(path.join(directory, entry.name));
      scraperList[scraper.name] = scraper;
    }
  });
};

const directoryPath = path.join(__dirname, './src/scraper');

const files = fs.readdirSync(directoryPath);
const api = {};

for (const folder of files) {
  api[folder] = {};
  scanDirectory(path.join(__dirname, 'src', 'scraper', folder), api[folder]);
}

api.search = (folder, scraper, ...args) => {
  const scraperList = api[folder];
  if (scraperList) {
    const selectedScraper = scraperList[scraper];
    if (selectedScraper) {
      return selectedScraper.search(...args);
    } else {
      throw new Error(`Scraper not found: ${scraper}`);
    }
  } else {
    throw new Error(`Folder not found: ${folder}`);
  }
};


module.exports = api;
