(async () => {
    const api = require('skrep');
     const url = 'genshin impact';
     const result = await api.nsfw.rule34.search(url);
     console.log(result)
})();
      