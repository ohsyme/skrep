(async () => {
    const api = require('skrep');
     const url = 'https://212.32.226.234/the-pink-album-chapter-01/';
     const result = await api.nsfw.doujindesu.download(url);
    //const url = 'https://www.facebook.com/reel/1221811732075864/?mibextid=eA6d3HrSeJoD5Dg0'
    // const result1 = await api.downloader.Facebook.scrape(url);
    console.log(result)
})();
      