export function getChapterCode(uri) {
  switch (uri) {
    case 'www.zwduxs.com':
      console.log("路径1");
      return `
                let lists=document.querySelectorAll('.box_con dd a');
                var chaperlist=[];
                var bookName=document.querySelector('.info h1').innerHTML.replace('最新章节','');
                for(let i=0;i<lists.length;i++){
                chaperlist.push({name:lists[i].innerHTML,uri:lists[i].href});
                }
              console.log(bookName);
              console.log(chaperlist);
                window.ReactNativeWebView.postMessage(bookName + '&' +JSON.stringify(chaperlist));
        `;
    case 'www.ptwxz.com':
      console.log("路径3");
      return `
                let lists=document.querySelectorAll('.centent li a');
                var chaperlist=[];
                var bookName=document.querySelector('.title h1').innerHTML.replace('最新章节','');
                for(let i=0;i<lists.length;i++){
                chaperlist.push({name:lists[i].innerHTML,uri:lists[i].href});
                }
                window.ReactNativeWebView.postMessage(bookName + '&' +JSON.stringify(chaperlist));
        `
        ;
    case 'www.dduxs.com':
      console.log("路径4");
      return `
                let lists=document.querySelectorAll('.book-list li a');
                var chaperlist=[];
                var bookName=document.querySelector('.book-describe h1').innerHTML;
                for(let i=0;i<lists.length;i++){
                chaperlist.push({name:lists[i].innerHTML,uri:lists[i].href});
                }
                window.ReactNativeWebView.postMessage(bookName + '&' +JSON.stringify(chaperlist));
      `;
    default: 
  console.log("路径总");
      return false;
  }
}
export function getContentCode(uri) {
  switch (uri) {
    case 'www.zwduxs.com':
      console.log("内容的路径1");
      return `
            window.test = function(){
                let content=document.querySelector('#content');
                while(content.firstElementChild.nodeName != 'BR'){
                content.removeChild(content.firstElementChild)
                }
                window.ReactNativeWebView.postMessage(content.innerText);
            }
            `;
    case 'www.ptwxz.com':
      return `
            window.test = function(){
                let content=document.querySelector('#content');
                while(content.firstElementChild.nodeName != 'BR'){
                content.removeChild(content.firstElementChild)
                }
                window.ReactNativeWebView.postMessage(content.innerText);
            }
            `;
    case 'www.dduxs.com':
      return `
            window.test = function(){
                let content=document.querySelector('#nr1');
                window.ReactNativeWebView.postMessage(content.innerText);
            }
          `;
    default:
      return false;
  }
}
