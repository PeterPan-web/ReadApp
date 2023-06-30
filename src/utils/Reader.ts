import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import source from '../assets/shuyuan.json';
import { toDBC } from './parse';
import { getBookListWithRule } from './parseWithRule';
export const getNovelContent = async (url: string) => {
  let content = '';
  let title = '';
  await fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      let clean = sanitizeHtml(data, {
        allowedAttributes: false,
        exclusiveFilter: function (frame: any) {
          return frame.tag === 'script';
        },
      });
      const $ = cheerio.load(
        clean.replace(/<\s*br[^>]*>/gi, '\n').replace(/\n{2,}/g, '\n'),
      );
      const textContent = $('.box_box')
        .text()
        .trim()
        .split('\n')
        .map(_ => '\u3000\u3000' + _.trim())
        .join('\n');
      title = $('.box_con h1').text();
      content = toDBC(textContent);
    })
    .catch(function (err) {
      console.warn('Something went wrong.', err);
    });
  return { content, title };
};
export const getListFromSource = async (text: any) => {
  console.log(text, "canshu1");

  const info = source[0];

  console.log(info, "本地数据");

  const url = info.searchUrl.replace(/\{\{(.+?)\}\}/g, () => text).split(',')[0];

  console.log(info.bookSourceUrl, "链接info.bookSourceUrl");
  console.log("``````````````");

  console.log(url, "Urlcccc");
  const key = '斗破苍穹'; // 替换为您要搜索的关键词
  // const uri = `https://www.121du.net/search/?wd=${encodeURI(key)}`;
  // const uri = `http://www.paoshu8.com/modules/article/search.php?searchkey=${encodeURI(key)}`;
  const encodedStr = encodeURIComponent(key).replace(/%/g, '\\u');
  const uri = `https://b.faloo.com/l/0/1.html?t=1&k=%u6597%u7834%u82CD%u7A79`;

  const userAgentList = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  ];
  
  const headers = {
    referer: "https://b.faloo.com/",
    userAgent: userAgentList[Math.floor(Math.random() * userAgentList.length)],
    credentials: 'include',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'BDUSS_BFESS=ZCZ3o3a3FLbmpla29DLU9pd0FOTnBFU3dPSkREQlAxZ3hvU25vdFhha1R3a2hrSVFBQUFBJCQAAAAAAAAAAAEAAAD76ZVIbWdkbWUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABM1IWQTNSFkTH; BAIDUID_BFESS=D093413EF2B549C335C6E4A8BD78E0CD:FG=1; ZFY=E91NC5ZK8uvZdWscmbssm7fLULIZ3nZbfbOKszP3VH4:C' 
  };
  const options = {
    method: 'GET',
    headers: headers
  };
  // const data = await fetch(info.bookSourceUrl + url).then(function (response) {
  //   return response.text();
  // });
 
  const data = await fetch(uri, options
  ).then(function (response) {
    console.log(response);
    return response.text();
  }).then(data => {
    console.log(data);
  }).catch(err=>{
    console.error(err);
  });
  const $ = cheerio.load(data);
  const res = getBookListWithRule($, info.bookSourceUrl);
  return res;
};
