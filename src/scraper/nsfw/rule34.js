const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'rule34',
  aliases: ['rule34'],
  async search(url) {
    url = url.replace(' ', '_')
    try {
    const response = await axios.get(`https://rule34.xxx/index.php?page=post&s=list&tags=${url}`);
    const $ = cheerio.load(response.data);
    const title = $(".image-list").find('img').map((i, el) => $(el).attr('src')).get();
    

    return title;

    } catch (error) {
      return 'ERROR';
    }
  },
  
};
    