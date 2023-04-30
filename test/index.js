(async () => {
    const api = require('skrep');
    const url = 'https://212.32.226.234/the-pink-album-chapter-01/';
    const result = await api.nsfw.doujindesu.download(url);
    console.log(result);
})();
      