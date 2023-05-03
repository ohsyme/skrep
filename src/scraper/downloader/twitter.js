module.exports = {
  name: 'Twitter',
  aliases: ['twitter'],
  async download(url) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      
      const response = await axios.post('https://www.expertsphp.com/instagram-reels-downloader.php', { url: url }, config);
      
      const $ = cheerio.load(response.data);

      const Result = [];
      
      $('.col-md-4.col-md-offset-4 > a.btn.btn-primary.btn-sm.btn-block').each((i, e) => {
        const link = $(e).attr('href')
        Result.push(link)
      })
      return ({
        description: $('div:nth-child(8) > p').text(),
        link: Result,
        Credits: Credits
      })
      
    } catch (error) {
      return 'ERROR';
    }
  },
};
    