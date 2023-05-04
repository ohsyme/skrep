(async () => {
    const api = require('skrep');
     const url = 'https://www.tiktok.com/@hanru01/video/7224425974945942786?is_from_webapp=1&sender_device=pc&web_id=7228471037720151554';
     const result = await api.downloader.tiktok.download(url);
     console.log(result)
})();
      