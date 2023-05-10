// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { Store, AnyAction } from 'redux';
import reducer from './reducers';
// import {StoreState} from '../types/store';
export type RootState = ReturnType<typeof reducer>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookshelf'], //需要缓存的数据
  // blacklist: [], //不需要缓存的数据
};
// AsyncStorage.setItem('root', this.state.toggle)
const persistedReducer = persistReducer(persistConfig, reducer);
// 定义 store 的类型
type AppDispatch = typeof store.dispatch;
export type StoreState = Store<RootState, AnyAction> & {
  dispatch: AppDispatch;
};
//暴露store
// const store: StoreState = configureStore({reducer:persistedReducer});
const store = configureStore({reducer:persistedReducer});

const persistor = persistStore(store);

export {store, persistor};
