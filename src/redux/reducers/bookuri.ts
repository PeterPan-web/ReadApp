/*
    1.该文件是用于创建一个为bookshelf组件服务的reducer，reducer的本质就是一个函数
    2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {GET_URI} from '../constants';
import {StoreBookshelf, setBookshelf,StoreUri} from '../../types/store';
import {All} from '../actions/bookshelf';

const initState: StoreUri = {
  contents: [
    {
      "bookSourceComment": "",
      "bookSourceGroup": "🎉 精选",
      "bookSourceName": "🎉 一读小说",
      "bookSourceType": 0,
      "bookSourceUrl": "https://www.121du.net",
      "customOrder": 0,
      "enabled": true,
      "enabledCookieJar": true,
      "enabledExplore": true,
      "exploreUrl": "[{\"title\":\"玄幻奇幻\",\"url\":\"/xuanhuan/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"武侠仙侠\",\"url\":\"/wuxia/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"都市言情\",\"url\":\"/dushi/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"历史军事\",\"url\":\"/lishi/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"科幻灵异\",\"url\":\"/kehuan/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"网游竞技\",\"url\":\"/wangyou/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"女频频道\",\"url\":\"/nvpin/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"其他小说\",\"url\":\"/qita/{{page-1}}/\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}},{\"title\":\"\",\"url\":\"\",\"style\":{\"layout_flexBasisPercent\":0.25,\"layout_flexGrow\":1}}]",
      "lastUpdateTime": 1683604981917,
      "respondTime": 3855,
      "ruleBookInfo": {
        "author": "[property$=author]@content",
        "coverUrl": "[property$=image]@content",
        "intro": "[property$=description]@content##(^|[。！？]+[”」）】]?)##$1<br>",
        "kind": "[property~=category|status|update_time]@content##小说|\\s.*",
        "lastChapter": "[property$=latest_chapter_name]@content##正文卷.|正文.|VIP卷.|默认卷.|卷_|VIP章节.|免费章节.|章节目录.|最新章节.|[\\(（【].*?[求更票谢乐发订合补加架字修Kk].*?[】）\\)]",
        "name": "[property$=book_name]@content"
      },
      "ruleContent": {
        "content": "#BookText@html"
      },
      "ruleExplore": {
        
      },
      "ruleReview": {
        
      },
      "ruleSearch": {
        "author": "span.1@text",
        "bookList": "<js>\nif(result.match(/^<script/)&&result.match(/\\/script>$/)){\njava.log('get Cookie...')\n\n$ = java.head(baseUrl,{referer:baseUrl}).cookies();\n\nsource.putLoginHeader(JSON.stringify({\n\t\t\"Cookie\": \"t=\"+$.token+\";r=\"+($.secret-100)\n}));\n\nurl=baseUrl+`,{\"headers\":{\"referer\":\"${baseUrl}\"}}`\nresult=java.ajax(url)\n}\nresult\n</js>#sitebox@dl",
        "bookUrl": "a.1@href",
        "checkKeyWord": "",
        "coverUrl": "img@data-src",
        "intro": "dd.2@textNodes",
        "kind": "span.3:2:0@text##\\s\\d.*",
        "lastChapter": "a.-1@text",
        "name": "a.1@text"
      },
      "ruleToc": {
        "chapterList": "@css:\n#allchapter>.title, #allchapter>.details\n\n@js:\nlist=[]\n$=result\nfor(i in $){\nif(String($[i]).match(/class=\"title/)){\n\t\tlist.push({\n\t\t\t\ttext: \" ★ \"+$[i].text()+\"\",\n\t\t\t\tvolume: true\n\t\t\t})\n\t}\nelse{\n\t\t$[i].select(\"a\").forEach(a=>{\n\t\t\t\tlist.push({\n\t\t\t\t\t\ttext: a.text(),\n\t\t\t\t\t\thref: a.attr(\"href\")\n\t\t\t\t\t})\n\t\t\t})\n\t}\n}\nlist",
        "chapterName": "text##正文卷.|正文.|VIP卷.|默认卷.|卷_|VIP章节.|免费章节.|章节目录.|最新章节.|[\\(（【].*?[求更票谢乐发订合补加架字修Kk].*?[】）\\)]",
        "chapterUrl": "href",
        "isVolume": "volume"
      },
      "searchUrl": "@js:\nurl=\"https://www.121du.net/search/?wd=\"+encodeURI(key);\n\nurl+`,{\"headers\":{\"referer\":\"${url}\"}}`",
      "weight": 0
    }
  ],
}; //初始化状态

export default function bookuriReducer(
  preState: StoreUri = initState,
  action: All,
): StoreBookshelf {
  //从action对象中获取：type、data
  const {type, data} = action;
  
  //根据type决定如何加工数据
  switch (type) {
    case GET_URI:
      return {contents: [...preState.contents, data as getUri]};
    // return { contents: [{ name: '默认', pUri: '', preChapter: 0 }] };
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const exhaustiveCheck: never = type; //走default时会报错   类型“xxx”的参数不能赋给类型“never”的参数。来确保actions的类型正确
      return preState;
  }
}
