(async () => {
    const api = require('skrep');
     const url = 'https://www.hentaibatch.com/2022/09/kanpeki-ojousama-no-watakushi-ga-dogeza.html';
     const result = await api.nsfw.HentaiBatch.detail(url);
     console.log(result)
})();
      