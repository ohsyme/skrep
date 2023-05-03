const path = require('path');
require('./settings.js');
// Shit Ass Change Later I Tired


// If you See Some Why there axios.get? from where how works? that imported from settings.js

// Sumpah Ini Jangan Di Delete Please
// Please Dont Delete This
async function getversion(){
  try {
  const directoryPath = path.join(__dirname, 'package.json');
  const data = fs.readFileSync(directoryPath);
  const packageJson = JSON.parse(data);
  const version = packageJson.version;
  const response = await axios.get(`https://www.npmjs.com/package/skrep`);
  const $ = cheerio.load(response.data);
  const version_npm = $('.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div:nth-child(6) > div > p').text();
  if ( version_npm === version || version_npm < version) {
    console.log("You Use Latest Version")
  } else {
    throw new Error("You Use Old Version Please Update Package By npm i skrep@latest")
  }
  }catch(err){
    console.log('Getting New Version Info Failed')
  }
}
getversion()

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
