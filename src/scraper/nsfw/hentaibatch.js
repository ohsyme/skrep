module.exports = {
  name: 'HentaiBatch',
  aliases: ['HentaiBatch'],
  async search(url) {
    try {
      const response = await axios.get(`https://www.hentaibatch.com/search?q=${url}&max-results=10&by-date=true`);
      const $ = cheerio.load(response.data);
      const Result = [];
      const Genre = []

      $('#Blog1 > div > article:nth-child(n)').each((i, e) => {
        const title = $(e).find('.post-rapih > h2 > a').text().replaceAll('\n', '').trim()
        const Release =  $(e).find('.time-info > span > span > a > abbr').text().replaceAll('\n', '').trim()
        const category =  $(e).find('.category > a').text().replaceAll('\n', '').replaceAll(' ', '') 
        const Genre =  [$(e).find('.labes').text().replace('Genre:', '')].join(' ').replaceAll('\n', ' ').trim()
        const Star =  $(e).find('.skor > span').text().replaceAll('\n', '').replaceAll(' ', '') 
        const Link = $(e).find('.post-rapih > h2 > a').attr('href')
        Result.push({
          title,
          Release,
          category,
          Genre,
          Star,
          Link,
          Credits: Credits
        });
      });

      return Result;
    } catch (error) {
      console.log(error)
      return 'ERROR';
    }
  },

  async detail(url){
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const Link = [];
    
    const e = '.henInfo > ul'
    const Title = $(e).find('li:nth-child(1) > span').text()
    const Synonmys = $(e).find('li:nth-child(2) > span').text()
    const Score = $(e).find('li:nth-child(3) > span').text()
    const Produser = $(e).find('li:nth-child(4) > span').text()
    const Tipe = $(e).find('li:nth-child(5) > span').text()
    const Status = $(e).find('li:nth-child(6) > span').text()
    const Total_episode = $(e).find('li:nth-child(7) > span').text()
    const Durasi = $(e).find('li:nth-child(8) > span').text()
    const Release_Date = $(e).find('li:nth-child(9) > span').text()
    const Studio = $(e).find('li:nth-child(10) > span').text()
    const Genre = $(e).find('li:nth-child(11) > span').text()

    $('.smokeddl > div:nth-child(n)').each(async (i, e) => { 
      const resolution = $(e).find('strong').text()
      const Name = $(e).find('a').first().text()
      const Links = $(e).find('a').attr('href')
      Link.push({
        resolution,
        Name,
        Links
      })
    })

    return ({
        Title,
        Synonmys,
        Score,
        Produser,
        Tipe,
        Status,
        Total_episode,
        Durasi,
        Release_Date,
        Studio,
        Genre,
        Link,
        Credits : Credits
    });

  }
};