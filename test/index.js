(async () => {
    const api = require('skrep');
    const url = 'https://www.instagram.com/reel/CrsOREkJbPi/?utm_source=ig_web_copy_link';
    const result = await api.downloader.instagram.download(url);
    console.log(result);
})();
      