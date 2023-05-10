import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Image,
  View,
  Center,
  Text,
  HStack,
  StatusBar,
  ScrollView,
  Pressable
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import Coverlist from "../../components/coverlist";
import { navigationProp, routeProp } from '../../types/navigate';

//type
interface Props {
  navigation: navigationProp;
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const goSearch = () => {
    navigation.navigate('Search', {})
  }
  const golist = (num:number) => {
    console.log("点击事件",num);
    
    // navigation.navigate('Search', {})
  }
  return (
    <>
      <StatusBar
        // animated={true}
        translucent={true}
        barStyle="dark-content"
        // hidden={true}
        backgroundColor={'transparent'}
      />
      <ScrollView w={windowWidth} h={windowHeight} bg={"rgb(255,255,255)"} pl={5} pr={5}
        showsVerticalScrollIndicator={false} >
        <View>
          <Text pt={50} fontSize="25" fontWeight="bold" color="rgb(212,212,212)">极简阅读</Text>
        </View>
        <Pressable onPress={goSearch} mt={5}>
          <View bg={"rgb(247,247,247)"} borderStyle="solid" borderWidth="1" borderColor="black" borderRadius={20} flexDirection="row" p={3}>
            <View><Ionicons name={"search-outline"} size={28}></Ionicons></View>
            <View><Text pt={1}>搜索小说，无广告阅读</Text></View>
          </View>
        </Pressable>
        <HStack justifyContent="space-around" mt={7}>
          <Pressable onPress={() => {
            golist(1)
          }
          }>
            <Center flex={1}>
              <Center>
                <Image source={require(`。、../../assets/home1.jpg`)} alt="Alternate Text" size="md" />
                <View><Text fontSize="15">书籍分类</Text></View>
              </Center>
            </Center>
          </Pressable>
          <Pressable onPress={() => {
            golist(2)
          }
          }>
            <Center flex={1} >
              <Center>
                <Image source={require(`。、../../assets/home2.jpg`)} alt="Alternate Text" size="md" />
                <View><Text fontSize="15">人气小说</Text></View>
              </Center>
            </Center>
          </Pressable>
          <Pressable onPress={() => {
            golist(3)
          }
          }>
            <Center flex={1}>
              <Center>
                <Image source={require(`。、../../assets/home3.jpg`)} alt="Alternate Text" size="md" />
                <View><Text fontSize="15">全本完结</Text></View>
              </Center>
            </Center>
          </Pressable><Pressable onPress={() => {
            golist(4)
          }
          }>
            <Center flex={1} >
              <Center>
                <Image source={require(`。、../../assets/home4.jpg`)} alt="Alternate Text" size="md" />
                <View><Text fontSize="15">抖音热书</Text></View>
              </Center>
            </Center>
          </Pressable>
        </HStack>
        <View mt={10}><Text fontSize={17} >全网热搜</Text>
        </View>
        <View mt={2} pt={5}>
          <Coverlist />
          <Coverlist />
          <Coverlist />
          <Coverlist />
        </View>
        <View style={{ height: 1}}></View>
      </ScrollView></>
  )
}
export default HomeScreen;
const styles = StyleSheet.create({
  homelist: {
    marginTop: 50,
    flexDirection: "row",
    fontSize: 30,
    height: 80,
    listimg: {
      width: 80,
      height: 80,
    },
    listword: {
      fontSize: 15,
    }
  }
})
