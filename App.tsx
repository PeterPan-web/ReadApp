import React  from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'react-native';
//引入限制路由api
import { stackParamsList } from './src/types/navigate';
//引入安卓
import { PermissionsAndroid } from 'react-native';
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
} from 'native-base';
//引入页面
import HomeScreen from './src/views/HomeScreen/HomeScreen'
import SearchScreen from './src/views/HomeScreen/searchScreen'
import SettingsScreen from './src/views/SettingsScreen/SettingsScreen'
import ShelfScreen from './src/views/ShelfScreen/ShelfScreen'
//
import ReadBook from './src/views/readBook';
import JustWeb from './src/views/justWeb';
//可以全局设置样式

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

const Tab = createBottomTabNavigator<stackParamsList>();
const stack = createStackNavigator<stackParamsList>();
// const Tab = createBottomTabNavigator();
// const stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <stack.Navigator >
      <stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <stack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }} />
    </stack.Navigator>
  )
}
const ReadNavigator = () => {
  return (
    <stack.Navigator >
     <stack.Screen name="Shelf" component={ShelfScreen} options={{ headerShown: false }} />
      <stack.Screen name='Details' component={ ReadBook } options={{ headerShown: false }} />
      <stack.Screen name="JustWeb" component={JustWeb} options={{ headerShown: false }} />
    </stack.Navigator>
  )
}
function App() {
  async function permissions() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      //返回得是对象类型
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      var data = '是否同意地址权限: ';
      if (granteds['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
        data = data + '是\n';
      } else {
        data = data + '否\n';
      }
      data = data + '是否同意读取权限: ';
      if (granteds['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
        data = data + '是\n';
      } else {
        data = data + '否\n';
      }
      data = data + '是否同意相机权限: ';
      if (granteds['android.permission.CAMERA'] === 'granted') {
        data = data + '是\n';
      } else {
        data = data + '否\n';
      }
      data = data + '是否同意存储权限: ';
      if (granteds['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
        data = data + '是\n';
      } else {
        data = data + '否\n';
      }
      console.log(data);
    } catch (err) {
      // console.log(err.toString());
    }
  }
  function checkPermission() {
    try {
      //返回Promise类型
      const granted = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      granted
        .then(data => {
          console.log(data + '权限');
        })
        .catch(err => {
          // console.log(err.toString());
        });
    } catch (err) {
      // console.log(err.toString());
    }
  }
  React.useEffect(() => {
    permissions();
  });
  return (
    <>
      {/* 状态栏隐藏 */}
      {/* <StatusBar hidden/>*/}
      <StatusBar />
      <NavigationContainer>
        <NativeBaseProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'browsers'
                      : 'browsers-outline';
                  } if (route.name === 'Shelf') {
                    iconName = focused ? 'book' : 'book-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
              <Tab.Screen name="Shelf" component={ReadNavigator} options={{ headerShown: false }} />
              <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
          </PersistGate>
          </Provider>
        </NativeBaseProvider>

      </NavigationContainer>
    </>
  );
}

export default App;
