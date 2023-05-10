import React from 'react';
import {AddIcon, Box, Pressable,Center,Text} from 'native-base';
interface Props {
  onPress: Function;
}
//书架添加书方框的组件
const blankBook = (props: Props) => {
  return (
    <Pressable
      onPress={() => {
        props.onPress();
      }}>
      <Box
        _dark={{bg: 'blueGray.800', borderColor: 'blueGray.600'}}
        _light={{borderColor: 'muted.200'}}
        px="8"
        py="10"
        marginBottom="5"
        flexBasis="30%"
        flexShrink={0}
        flexGrow={0}
       >
        <AddIcon
          size="8"
          _dark={{color: 'blueGray.600'}}
          _light={{color: 'muted.200'}}
        />
        <Center mt={3} ><Text color="gray.500">去挑书</Text></Center>
      </Box>
    </Pressable>
  );
};

export default blankBook;
