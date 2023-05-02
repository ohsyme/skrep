(async () => {
    const api = require('skrep');
     const url = '406591';
     const result = await api.nsfw.nhentai.scrape(url);
    console.log(result)
})();
      