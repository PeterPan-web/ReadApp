import React from 'react';
import {
  Center,
  Switch,
  Text,
  HStack,
  StatusBar,
  Box,
  ScrollView,
  Flex,
  Button,
  useColorMode,
  Modal,
  SearchIcon,
  HamburgerIcon,
  Menu,
  Pressable
} from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';

import { store } from '../../redux/store';
import BlankBook from '../../components/blankBook';
import Book from '../../components/book';
import { Dimensions } from 'react-native';
//type
import { navigationProp } from '../../types/navigate';
import { storeBookMsg } from '../../types/store';
interface Props {
  navigation: navigationProp;
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light' ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

const ShelfScreen: React.FC<Props> = ({ navigation }) => {
  const deviceW = Dimensions.get('window').width;

  const [books, setBooks] = React.useState<storeBookMsg[]>(
    store.getState().bookshelf.contents,
  );
  const [showModal, setShowModal] = React.useState(false);
  store.subscribe(() => {
    setBooks(store.getState().bookshelf.contents);
  });
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    navigation.navigate('Details', {
      uri: text,
    });
  };
  return (
    <Center
      paddingTop={6}
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}>
      <StatusBar
        animated={true}
        translucent={true}
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <HStack justifyContent="space-between" w={deviceW - 30} >
        <Center >
          <Text fontSize={25}>书架</Text>
        </Center>
        <HStack justifyContent="space-evenly" w={100} pt="2">
        <Pressable onPress={() => {
         console.log("I'm Pressed");
         navigation.navigate('Search', {});
        }
          }
          >
         <SearchIcon
            size="6"
            _dark={{ color: 'muted.300' }}
            _light={{ color: 'blueGray.500' }}
          /> 
        </Pressable>
          <Menu w="200" trigger={triggerProps => {
            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon size="6" ml="2"
                _dark={{ color: 'muted.300' }}
                _light={{ color: 'blueGray.500' }}
              />
            </Pressable>
          }}>
            <Menu.Item>编辑</Menu.Item>
            <Menu.Item>列表模式</Menu.Item>
            <Menu.Item>本地传书</Menu.Item>
            <Menu.Item>书源管理</Menu.Item>
          </Menu>
        </HStack>
      </HStack>
      <ScrollView position="relative" top={2} maxHeight="80%">
        <Flex
          direction="row"
          flexWrap="wrap"
          // alignItems="center"
          justifyContent="space-between"
          position="relative">
          {books.map(element => {
            return (
              <Book
                name={element.name}
                key={element.name}
                pUri={element.pUri}
                onPress={(uri: string) => {
                  console.log(element);
                  navigation.navigate('Details', {
                    uri,
                  });
                }}
              />
            );
          })}
          <BlankBook
            onPress={() => {
              // setShowModal(true);
              navigation.navigate('Home', {});
            }}
          />
          <Box
            flexBasis="30%"
            flexShrink={0}
            flexGrow={0}
            width="0"
            height="0"
          />

          { /* <Button
            onPress={() => {
              console.log(store.getState().bookshelf.contents);
            }}>
            store
          </Button>*/}
          {/* <ToggleDarkMode /> */}
        </Flex>
      </ScrollView>
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>提示</Modal.Header>
          <Modal.Body>
            <Text>目前仅支持通过网址导入小说，此操作将调用您的粘贴板</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                取消
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  fetchCopiedText();
                }}>
                确认
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </Center>
  );
};

export default ShelfScreen;

