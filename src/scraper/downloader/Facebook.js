module.exports = {
  name: 'Facebook',
  aliases: ['Facebookdownloader', 'fbdl'],
  async scrape(url) {
      try {
        const response = await Facebook1(url)
        console.log(response)
        return response
      } catch (error) {
        const response = await facebook2(url)
        return response || null
      }
      
  },
};

async function Facebook1(){
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
      Credits: Credits
    });
  });

  return Result;
}

async function facebook2(url){
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  const response = await axios.post('https://getmyfb.com/process', { id: url, locale: 'id'}, config)
  const $ = cheerio.load(response.data);
  const Result = [];

  $('.results-download > ul > li:nth-child(n)').each((i, e) => {
    const resolution = $(e).text().replaceAll('\n', '').replaceAll(' ', '').replace('Unduh', '')
    const link = $(e).find('a').attr('href')
    Result.push({resolution, link})
  })
  return ({
    description: $('.results-item-text').text().replaceAll('\n', '').trim(),
    link: Result,
    Credits: Credits
  })

}