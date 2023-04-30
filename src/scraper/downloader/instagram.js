const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'instagram',
  aliases: ['instagram'],
  async download(url) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
      
    const response = await axios.post('https://igdownloader.app/api/ajaxSearch', { q: url }, config);
      
    const $ = cheerio.load(response.data.data);

    const links = $('*[value*="https://scontent.cdninstagram.com"]').map((i, el) => $(el).attr('value')).get();

    const filteredLinks = links.filter(link => link.includes('p1080x1080'));

    return filteredLinks
      
    } catch (error) {
      return 'ERROR';
    }
  },
};
    