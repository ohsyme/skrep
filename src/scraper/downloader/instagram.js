// arigato dhika kun
module.exports = {
  name: 'instagram',
  aliases: ['instagram'],
  async download(url) {
    try {
        let Get_Data = await axios.get(url)
        let Get_Result = Get_Data.data
        let $ = cheerio.load(Get_Result)
        let data = JSON.parse($('script').html())
        let media = []
        for (let x of [...data.image, ...data.video]) media.push(x.url || x.contentUrl) 
        return {
          caption: data.articleBody, media,
          Credits: Credits
        }
    } catch (error) {
      return 'ERROR';
    }
  },
};