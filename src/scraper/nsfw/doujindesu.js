const axios = require('axios');
const cheerio = require('cheerio');
const doudesubase = "https://212.32.226.234"
module.exports = {
  name: 'doujindesu',
  aliases: ['doujindesu', 'doudesu'],
  async search(search, page = 1) {
    try {
      const response = await axios.get(`${doudesubase}/page/${page}/?s=${search}`);
      const $ = cheerio.load(response.data);
      const Result = [];

      $('#archives > div > article:nth-child(n) > a').each((i, e) => {
        const Thumbnail = $(e).find('figure > img').attr('src')
        const Title = $(e).find('div > h3 > span').text()
        const score = $(e).find('.score').text()
        const status = $(e).find('.status').text()
        const link = doudesubase + $(e).attr('href')
        Result.push({
          Thumbnail,
          Title,
          score,
          status,
          link
        });
      });

      return Result;
    } catch (error) {
      return 'ERROR';
    }
  },

  async detail(url){
    if (!url.startsWith(doudesubase)) return console.log('Not Valid Link!\n Example: https://212.32.226.234/manga/marisa-chan-to-sukebe-suru-hon/')

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // lagi kocak kocaknya gweh kapan kapan gw improve
    let e = "#archive > div"
    const Thumbnail = $(e).find('aside > figure > a > img').attr('src')
    const Title = $(e).find('section > h1').text()
    const Status = $(e).find('section > table > tbody > tr:nth-child(1) > td:nth-child(2) > a').text()
    const Type = $(e).find('section > table > tbody > tr.magazines > td > a').text()
    const Series = $(e).find('.parodies > td:nth-child(2) > a').text()
    const Character = $(e).find('section > table > tbody > tr:nth-child(4) > td:nth-child(2) > a').text()
    const Author = $(e).find('section > table > tbody > tr:nth-child(5) > td:nth-child(2) > a').text()
    const Group = $(e).find('section > table > tbody > tr:nth-child(6) > td:nth-child(2) > a').text()
    const Rating = $(e).find('section > table > tbody > tr:nth-child(7) > td:nth-child(2) > div').text()
    const Date = $(e).find('section > table > tbody > tr.created.createdAt > td:nth-child(2)').text()

    return ({
      Thumbnail,
      Title,
      Status,
      Type,
      Series,
      Character,
      Author,
      Group,
      Rating,
      Date,
    });
    
  },

  async download(url){
    if (!url.startsWith(doudesubase)) return console.log('Not Valid Link!\n Example: https://212.32.226.234/manga/marisa-chan-to-sukebe-suru-hon/')

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const Get_ID = $("#reader").attr('data-id')

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    
    const responses = await axios.post('https://212.32.226.234/themes/ajax/ch.php', { id: Get_ID }, config);
    
    const $$ = cheerio.load(responses.data);
    const Result = [];

    $$('img').each((i, e) => {
      const get_image = $$(e).attr('src')
      Result.push(get_image)
    })

      const requests = Result.map((result) => {
        const config = {
          url: result,
          responseType: 'arraybuffer',
          headers: {
            referer: 'https://doujindesu.xxx/'
          }
        };
    
        return axios(config);
      });

      const responses1 = await Promise.all(requests);
      console.log("These Results Are Buffers You Can Use Fs Package to Convert")
    
      const dataArray = responses1.map((response) => {
        return Array.from(Buffer.from(response.data));
      });
      return dataArray;
  }

};
    