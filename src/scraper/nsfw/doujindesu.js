const { PDFDocument } = require('pdf-lib');
const { jsPDF } = require('jspdf');
const AnonFiles = require('../../utils/Anonfiles.js')

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
          link,
          Credits: Credits
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
      Credits: Credits
    });
    
  },

  async download(url){

    // thank you mas ripan
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

    const all_done = await createPDF(url, Result)
    return all_done
    
  }

};



// to be honest i want put this in utils but idk why not working lol
async function anonfiless(link, metadata = false, redirect = false) {
  try {
    const { data } = await axios.get(`${link}`);
    const $ = cheerio.load(data);
    const a_href = $('a#download-url').attr('href');
    const a = String(a_href);
    const aDict = {
      directDownload: a
    };
    if (metadata === true) {
      const id = link.split('/', 4)[3];
      const jsondata = (await axios.get(`https://api.anonfiles.com/v2/file/${id}/info`)).data;
      jsondata.data.file.url.directDownload = a;
      return jsondata;
    } else if (redirect) {
      window.open(a);
    } else if (redirect && metadata) {
      window.open(a);
      const id = link.split('/', 4)[3];
      const jsondata = (await axios.get(`https://api.anonfiles.com/v2/file/${id}/info`)).data;
      jsondata.data.file.url.directDownload = a;
      delete jsondata.data.file.url.full;
      return jsondata;
    } else if (metadata === false && redirect === false) {
      return aDict;
    }
  } catch {
    return 'Link is Invalid';
  }
}


async function saveImages(Result) {
  const imageFolder = './images';
  const promises = Result.map((imageUrl, index) => {
    const fileName = `${index + 1}.jpg`;
    const filePath = `${imageFolder}/${fileName}`;
    const config = {
      url: imageUrl,
      responseType: 'arraybuffer',
      headers: {
        referer: 'https://doujindesu.xxx/'
      }
    };
    return axios(config).then((response) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, response.data, (err) => {
          if (err) reject(err);
          console.log(`Image saved to ${filePath}`);
          resolve(filePath);
        });
      });
    });
  });
  const files = await Promise.all(promises);
  return files;
}


async function createPDF(url, Result1) {
  try {
    const files = await saveImages(Result1);
    const doc = new jsPDF();
    for (let i = 0; i < files.length; i++) {
      const imagePath = files[i];
      const imageBytes = fs.readFileSync(imagePath);
      const imageData = imageBytes.toString('base64');
      const imageWidth = doc.internal.pageSize.width;
      const imageHeight = doc.internal.pageSize.height;
      doc.addImage(
        imageData,
        'JPEG',
        0,
        0,
        imageWidth,
        imageHeight,
        '',
        'FAST'
      );
      if (i < files.length - 1) {
        doc.addPage();
      }
    }
    const pdfBytes = await doc.output('arraybuffer');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const filename = url.replace('https://212.32.226.234/', '').replaceAll('/', '')
    const pdfFile = `./images/${filename}.pdf`;
    const pdfBytesModified = await pdfDoc.save({
      addDefaultPage: false,
      useObjectStreams: false
    });
    await fs.promises.writeFile(pdfFile, pdfBytesModified);
    console.log('PDF created successfully!');
    const pdfBuffer = Buffer.from(pdfBytesModified);
    const response = await AnonFiles.uploadBlob(pdfBuffer, `${filename}.pdf`, 0);
    const anonfilled = await anonfiless(response.data.file.url.short, true , true)
    for (const file of files) {
      await fs.promises.unlink(file);
    }
    await fs.promises.unlink(pdfFile);
    console.log(`PDF ${pdfFile} deleted successfully!`);


    return({
      file_name: `${anonfilled.data.file.metadata.name}`,
      size: anonfilled.data.file.metadata.size,
      full_link: anonfilled.data.file.url.full,
      short_link: anonfilled.data.file.url.short,
      direct_link: anonfilled.data.file.url.directDownload,
      Credits: Credits
    })

  } catch (err) {
    console.error(err);
  }
}