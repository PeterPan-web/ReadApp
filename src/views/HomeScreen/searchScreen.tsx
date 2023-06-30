import { useState }  from 'react';
import { Box, View, Center, StatusBar, ScrollView } from 'native-base';
import Search from '../../components/search';
import HostSearch from '../../components/hostSearch';
import * as reader from '../../services/reader';
import HideWebView from '../../components/hideWebView';
import useSearchNovel from '../../services/useSearchNovel';
import {getListFromSource} from '../../utils/Reader';
const SearchScreen = () => {
  const [searchState, setSearchState] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const handleSearch = (value:string) => {
    console.log(`Searching for "${value}"...`);
    setSearchKey(value)
    useSearchNovel(encodeURI(value))
    // getListFromSource(encodeURI(value))
    // reader.search(encodeURIComponent(value))
    // 执行搜索操作，例如发送搜索请求等
    // setSearchState(false)
  };
  return (
    <>
      <StatusBar
        // animated={true}
        translucent={true}
        barStyle="dark-content"
        // hidden={true}
        backgroundColor={'transparent'}
      />
      <ScrollView>
        <Center mt={5} h={90}>
          <Search onSubmit={handleSearch}></Search>
        </Center>
        {searchState?<View>
          <HostSearch title="热点搜索"></HostSearch>
          <HostSearch title="历史搜索"></HostSearch>
        </View>:<></>}
        {searchState?<></>:<HideWebView key={searchKey}/>}
      </ScrollView>
    </>


  )
}
export default SearchScreen;
