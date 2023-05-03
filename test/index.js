(async () => {
    const api = require('skrep');
     const url = 'skrep';
     const result = await api.stats.npmstats.stats(url);
     console.log(result)
})();
      