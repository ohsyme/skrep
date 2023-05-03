const axios = require('axios');
const cheerio = require('cheerio');
const Credits = 'Thank You Using My Package, Credits: https://www.npmjs.com/package/skrep'
module.exports = {
  name: 'npmstats',
  aliases: ['npm'],
  async search(url) {
    const response = await axios.get(`https://www.npmjs.com/search?q=${url}`);
    const $ = cheerio.load(response.data);
    const Result = [];
    $('#main > div._23fffac0.w-100.mw9.ph5-ns.ph3-l.ph1-m.mh3-ns.center.center-ns.flex.flex-column.flex-row-l.justify-between > div > section').each((i, e) => {
      const title = $(e).find('.bea55649.flex.flex-row.flex-wrap.items-end.pr3 > a').text();
      const Description = $(e).find('._0d2164ff > p').text();
      const Creator = $(e).find('._0be7a12f.f6.black-80.mt1.mb1.flex-ns.db.flex-row.lh-copy > div > a').text();
      const Link = 'https://www.npmjs.com' + $(e).find('.bea55649.flex.flex-row.flex-wrap.items-end.pr3 > a').attr('href')
      Result.push({
        title,
        Description,
        Creator,
        Link,
      });
    });
    return Result
  },

  async stats(url){
    const response = await axios.get(`https://www.npmjs.com/package/${url}`);
    const $ = cheerio.load(response.data);
    const title = $('.w-100.ph0-l.ph3.ph4-m > h2 > span').text()
    const install = $('.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p > code > span').text()
    const github = $('#repository-link').text()
    const readme = $('#readme').text().replaceAll('\n', '').trim()
    const Result = [];
    const contributor = []
    $('.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l').each((i, e) => {
      const weekly_download = $(e).find('div:nth-child(5) > div > div > p').text();
      const version = $(e).find('div:nth-child(6) > div > p').text();
      const Size = $(e).find('div:nth-child(8) > p').text();
      const total_files = $(e).find('div:nth-child(9) > p').text();
      const last_update = $(e).find('div:nth-child(10) > p > time').text()
      Result.push({
        weekly_download,
        version,
        Size,
        total_files,
        last_update
    });
    $('._702d723c.dib.w-50.fl.bb.b--black-10.pr2.bb-0.w-100 > ul').each((i, e) => {
      const total_contributor = $(e).length
      const name = $(e).find('a').attr('href').replace('/~', '')
      const url = $(e).find('a').attr('href')
      contributor.push({
        total_contributor,
        name,
        url
    });
    });


    });

    return ({
      title: title,
      install : install,
      github_link : github,
      more_specific: Result,
      contributor: contributor,
      readme: readme,
      Credits: Credits
    })
  }
  
};