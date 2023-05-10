import React from 'react';
import { Text, View, Modal, Button } from 'native-base';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview';


import RNFS from 'react-native-fs';

//引入action
import { set_shelf, edit_book } from '../redux/actions/bookshelf';
//引入connect用于连接UI组件与redux
import { connect } from 'react-redux';
import { StoreState } from '../types/store';
import Read from '../containers/read';
import { getChapterCode } from '../utils/grab';
//@type
import { storeBookMsg } from '../types/store';
interface Props {
  uri: string;
  edit_book: Function;
  set_shelf: Function;
  books: storeBookMsg[];
}
const hideWebView: React.FC<Props> = props => {
  //切割网址
  function splitUri(uri: string) {
    return uri.split('/')[2];
  }
  async function myMkdir(path: string) {
    console.log(path);
    try {
      let isExists = await RNFS.exists(path);
      if (!isExists) {
        RNFS.mkdir(path);
      }
    } catch (err) {
      console.log(err);
    }
  }
  //讲解析后的书籍内容写入缓存
  async function write(
    LastDirectory: string,
    name: string,
    contents: string,
    encoding: string,
  ) {
    try {
      let path = RNFS.CachesDirectoryPath + '/myBook' + `/${LastDirectory}`;
      await myMkdir(path);
      path += `/${name}.txt`;
      await RNFS.writeFile(path, contents, encoding);
      console.log('path=' + path);
    } catch (err) {
      console.log(err);
    }
  }
  function checkUri(uri: string) {
    var reg =
      /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~_\/])+$/;
    return reg.test(uri) && getChapterCode(splitUri(uri));
  }
  //解析目的地址传来的string
  function analysis(contents: string): string[] {
    let index = contents.indexOf('&');
    let res = [];
    res.push(contents.slice(0, index).replace('&', ''));
    res.push(contents.slice(index + 1));
    return res;
  }
  //将不存在的书加入书架或者更新已存在的书
  function addBookshelf(name: string) {
    // let books = store.getState().bookshelf.contents;
    const { books } = props;
    //flag为true则书不存在
    let flag = true;
    for (let item of books) {
      if (item.name === name) {
        flag = false;
        break;
      }
    }
    if (flag) {
      props.set_shelf({ name, pUri: props.uri, preChapter: 0 });
    } else {
      props.edit_book({ name, pUri: props.uri });
    }
  }
  const jsCode = getChapterCode(splitUri(props.uri));
  // const [uri, setUri] = React.useState('https://www.ptwxz.com/html/8/8927/');
  const [checkUriRes] = React.useState(checkUri(props.uri));
  const [name, setName] = React.useState('');
  const [purify, setPurify] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [chapterList, setChapterList] = React.useState([]);
  const web = React.useRef<WebView>(null);
  const uri = props.uri;


  useUpdateEffect((uri: string) => {
    if (!checkUriRes && showModal === false) {
      // props.navigation.navigate('Home', { uri });
    }
  }, [showModal]);

  useUpdateEffect(() => {
    setPurify(true);
    console.log(purify);
  }, [chapterList]);


  function useUpdateEffect(func: Function, listener: any[], ...args: any[]) {
    let isInitialMount = React.useRef(true);
    React.useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        func.apply(undefined, args);
      }
    }, listener);
  }
  const onWebViewLoad = () => {
    console.log("webview页面执行");
    const getLinksScript = `
    let urilists=document.querySelectorAll('.ptm-card-content li a');
    var chaperlist=[];
    let booklists=document.querySelectorAll('.ptm-img-body');

    var chaperlist=[];
      for(let i=0;i<lists.length;i++){
       chaperlist.push({name:booklists[i].innerHTML,uri:urilists[i].href});
    }
    console.log(chaperlist);
    window.ReactNativeWebView.postMessage(JSON.stringify(chaperlist));
`;
    web.current!.injectJavaScript(getLinksScript);
  }
  const onMessageReceived = (event: WebViewMessageEvent) => {
    console.log("pureBook回调函数执行",event.nativeEvent.data);
    let res = analysis(event.nativeEvent.data);
    setName(res[0]);
    write(res[0], 'a', res[1], 'utf8');
    addBookshelf(res[0]);
    // console.log(JSON.parse(res[1]));
    setChapterList(JSON.parse(res[1]));
  }
  return (
    <View>
      <View style={{ height: '100%', width: '100%', overflow: 'hidden' ,display:"none"}}>
        {purify ? (
          <Read chapterList={chapterList} name={name} />
        ) : (
          <WebView
            startInLoadingState={true}
            ref={web}
            source={{ uri }}
            onLoad={onWebViewLoad}
            onMessage={onMessageReceived}
          // onLoadEnd={() => {
          //   setShowModal(true);
          // }}
          />
        )}
      </View>
      {/* <Modal isOpen={showModal} onClose={() => { setShowModal(false), "点击按钮后" }} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>提示</Modal.Header>
          <Modal.Body>
            <Text>
              {checkUriRes
                ? '检测到该网站支持净化阅读，是否净化'
                : '抱歉，未检测到网址，或该网站暂时不支持净化阅读'}
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                if (checkUriRes) {
                  console.log("测试checkUriRes，注入");
                  onMessageReceived;
                  setShowModal(false);
                } else {
                  let url = 'https://www.wolai.com/chU6iMXUSPtvtZz3EcKsGt';
                  Linking.canOpenURL(url)
                    .then(supported => {
                      if (!supported) {
                        console.warn("Can't handle url: " + url);
                      } else {
                        return Linking.openURL(url);
                      }
                    })
                    .catch(err => console.error('An error occurred', url));
                  setShowModal(false);
                }
              }}>
              {checkUriRes ? '净化' : '链接导入说明'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </View>
  );
};
export default connect(
  (state: StoreState) => {
    console.log(state);
    return {
      books: state.bookshelf.contents,
    };
  },
  { set_shelf, edit_book },
)(hideWebView);
