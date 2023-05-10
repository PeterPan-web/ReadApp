import {
  Image,
  View,
  Text,
  HStack,
  VStack,
  Pressable
} from 'native-base';
import React from 'react'

//显示书籍的组件
function coverlist() {
  return (
    <>
      <Pressable onPress={() => {
        console.log(1);
      }
      }>
        <View borderRadius="20" flexDirection='row' paddingBottom="30" >
          <HStack space={3}  backgroundColor="rgb(247,247,247)">
          <View><Image source={require("../img/num.jpg")} w={100} h={140} borderRadius={10}></Image>
          </View>
          <View pt={1} w={250} overflow={'hidden'}>
            <VStack space={4}>
            <Text>我在精神病院学斩神</Text>
            <Text >你是否想过，在霓虹璀璨的都市之下，潜藏着来自古老神话的怪物?</Text>
            <Text fontSize="12" mt={3}>三九音域·都市生活·连载中</Text>
            </VStack>
          </View>
          </HStack>
        </View>
      </Pressable>
    </>
  )
}

export default coverlist;