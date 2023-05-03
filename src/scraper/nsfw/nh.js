module.exports = {
  name: 'nhentai',
  aliases: ['nhentai'],
  async scrape(url) {
    try {
      const response = await axios.get(`https://nhentai.to/g/${url}`);
      const $ = cheerio.load(response.data);
      const Result = [];
      const id = $('#gallery_id > span').text()
      const title = $('#info > h1').text()
      const alternative_title = $('#info > h2').text()
      const language = $('#tags > div:nth-child(5) > span > a > span.name').text()
      const Categories = $('#tags > div:nth-child(6) > span > a > span.name').text()
      const total_page = $('#tags > div:nth-child(7) > span > a > span').text()
      const upload = $('#tags > div:nth-child(8) > span > time').text()
      $('#thumbnail-container > div').each((i, e) => {
        const Link = $(e).find('a > img').attr('data-src')
        Result.push(Link);
      });
      return ({
        id : id + url,
        title : title,
        alternative_title: alternative_title,
        language: language,
        Categories: Categories,
        total_page: total_page,
        upload: upload,
        Link : Result,
        Credits: Credits
      })
    } catch (error) {
        console.log(error)
      return 'ERROR';
    }
  },
};
    