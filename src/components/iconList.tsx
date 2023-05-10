import React from "react";

import { Center, Image, View, Text, Pressable } from "native-base";
import { navigationProp } from '../types/navigate';
import { useNavigation } from '@react-navigation/native';

interface Props {
  uri: string,
  title: string,
  // navigation: navigationProp;
}
//type
// import { useNavigation } from '@react-navigation/native';


const iconList: React.FC<Props> = ({ uri, title }) => {
  uri
  // const navigation = useNavigation(); // 获取 navigation 对象
  const golist = () => {
    console.log(uri);
    // navigation.navigate("Home")
  }
  return (
    <Pressable onPress={() => {
      console.log(`../../${uri}`, "点击事件");
    }
    }>
      <Center flex={1} px="3">
        <Center>
          <Image source={require(`../../assets/home1.jpg`)} alt="Alternate Text" size="xl" />
          <View><Text fontSize="25" fontWeight="bold">{title}</Text></View>
        </Center>
      </Center>
    </Pressable>
  )
};
export default iconList;