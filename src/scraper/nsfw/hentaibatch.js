const axios = require('axios');
const cheerio = require('cheerio');
const Credits = 'Thank You Using My Package, Credits: https://www.npmjs.com/package/skrep'
module.exports = {
  name: 'HentaiBatch',
  aliases: ['HentaiBatch'],
  async search(url) {
    try {
      const response = await axios.get(`https://www.hentaibatch.com/search?q=${url}&max-results=10&by-date=true`);
      const $ = cheerio.load(response.data);
      const Result = [];
      console.log(title)
      $('#Blog1 > div > article').each((i, e) => {
        const title = $(e).find('div.post-rapih > h2 > a').text().replaceAll('\n', '').replaceAll(' ', '') 
        const Release =  $(e).find('.time-info > span > span > a > abbr').text().replaceAll('\n', '').replaceAll(' ', '') 
        const category =  $(e).find('.category > a').text().replaceAll('\n', '').replaceAll(' ', '') 
        const Genre =  $(e).find('.labes > a').text()
        const Star =  $(e).find('.skor > span').text().replaceAll('\n', '').replaceAll(' ', '') 
        Result.push({
          title,
          Release,
          category,
          Genre,
          Star
        });
      });

      return Result;
    } catch (error) {
      return 'ERROR';
    }
  },
};
    