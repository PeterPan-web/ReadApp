import { useState }  from 'react';
import {SearchIcon, Input,Button } from 'native-base';
//type
import { useNavigation } from '@react-navigation/native';

interface Props {
  onSubmit: Function;
}
const search: React.FC<Props> = props =>  {
  const navigation = useNavigation(); // 获取 navigation 对象
  const [searchText, setSearchText] = useState('');
  const Search=()=>{
    props.onSubmit(searchText);
   }
  const goHome=()=>{
    navigation.navigate("Home",{})
   }
  return (
    <>
    <Input
      variant="rounded"
      overflow="visible"
      position="absolute"
      placeholder="搜索书籍或作者，宁少字勿错别字~"
      top="8"
      size="3"
      w={{
        base: '85%',
        md: '25%',
      }}
      value={searchText}
      onChangeText={setSearchText}
      onSubmitEditing={Search}
      InputLeftElement={
        <SearchIcon
          size="6"
          ml="4"
          _dark={{color: 'muted.300'}}
          _light={{color: 'blueGray.500'}}
        />
      }
      InputRightElement={<Button onPress={goHome}
        size="sm" variant="ghost" borderRadius={20}
        >取消</Button >}
    />

    </>
  );
};

export default search;
