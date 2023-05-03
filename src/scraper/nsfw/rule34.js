const axios = require('axios');
const cheerio = require('cheerio');
const Credits = 'Thank You Using My Package, Credits: https://www.npmjs.com/package/skrep'

module.exports = {
  name: 'rule34',
  aliases: ['rule34'],
  async search(url) {
    url = url.replace(' ', '_')
    try {
    const response = await axios.get(`https://rule34.xxx/index.php?page=post&s=list&tags=${url}`);
    const $ = cheerio.load(response.data);
    const title = $(".image-list").find('img').map((i, el) => $(el).attr('src')).get();
    

    return ({
      title,
      Credits: Credits
    });

    } catch (error) {
      return 'ERROR';
    }
  },
  
};
    