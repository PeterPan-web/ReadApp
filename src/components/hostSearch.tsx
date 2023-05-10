import React  from 'react';
import { StyleSheet,TouchableOpacity} from 'react-native'
import { View, Text,HStack,Box,Center} from "native-base";

//type
import { useNavigation } from '@react-navigation/native';

//热点的组件
interface Props {
  title: string;
}
const hostSearch: React.FC<Props> = props => {
  const navigation = useNavigation(); // 获取 navigation 对象
  const goHome=()=>{
    console.log(1);
   }
  return (
    <View mt={5}> 
      <Text fontSize={13} ml={8}>
      {props.title}
      </Text>
      <HStack space={8} pl={8} pt={5}>
        <HStack space={2}>
        <Center w={23} h={23} bg="orange.600" borderRadius={5}><Text color="white">1</Text></Center>
        <Center>我在精神病院学斩神1</Center>  
        </HStack>
        <HStack space={2}>
        <Center w={23} h={23} bg="orange.600"borderRadius={5}><Text color="white">2</Text></Center>
        <Center>我在精神病院</Center>  
        </HStack>
      </HStack>
      <HStack space={8} pl={8} pt={5}>
        <HStack space={2}>
        <Center w={23} h={23} bg="orange.600"borderRadius={5}><Text color="white">3</Text></Center>
        <Center>我在精神病院学斩神1</Center>  
        </HStack>
        <HStack space={2}>
        <Center w={23} h={23} bg="orange.600"borderRadius={5}><Text color="white">4</Text></Center>
        <Center>我在精神病院</Center>  
        </HStack>
      </HStack>
    </View>
  );
};

export default hostSearch;

//正常字体的样式
const styles = StyleSheet.create({
})
