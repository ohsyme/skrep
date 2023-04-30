const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'Facebook',
  aliases: ['Facebookdownloader', 'fbdl'],
  async scrape(url) {
    try {
      const response = await axios.post('https://www.getfvid.com/downloader', { url });
      const $ = cheerio.load(response.data);
      const Result = [];

      $('.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div').each((i, e) => {
        const title = $(e).find('div > div.col-md-5.no-padd > div > h5 > a').text();
        const download_link = $(e).find('div.col-md-4.btns-download > p:nth-child(1) > a').attr('href');
        const audio_link = $(e).find('div.col-md-4.btns-download > p:nth-child(2) > a').attr('href');
        Result.push({
          title,
          download_link,
          audio_link,
        });
      });

      return Result;
    } catch (error) {
      return 'ERROR';
    }
  },
};
    