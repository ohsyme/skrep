
module.exports = {
    name: 'tiktok',
    aliases: ['tiktok'],
    /*async search(url) {
      const response = await axios.get(`https://www.tiktok.com/@${url}`);
      const $ = cheerio.load(response.data);
      
      // Ch7]2A79Rg+?^i>;bp.@E+*d.ALJfP-R2P]7nI&d<'aJP-RgZ]FDYhB.4GU6Df0W7Ch558DeCJ/@<>p1<HD_l9lFQbCh5$
      // 85

      // Soon
    },*/

    async download(url){
      let download = await musically(url)
      return download
    }
  
}





// gatau yang buat siapa kalo ada yg punya bikin issue yg bikin gw gatau siapa yg bikin orangnya ntar gw taro credits
function musically(URL) {
	return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)    

            const result = {
				      pp: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img').attr('src'),
				      username: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2)').text(),
				      description: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)').text(),
                video: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)').attr('href'),
                video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
            }
        resolve(result)
        })
    })
    })
    })
	
}