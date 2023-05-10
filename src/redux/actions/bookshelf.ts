/*
    该文件专门为bookshelf组件生成action对象
    我想改成所有的
*/
import * as constants from '../constants';
import {setBookshelf, editBook,getUri} from '../../types/store';
export interface SET_SHELF {
  type: constants.SET_SHELF_t;
  data: setBookshelf;
}

export interface EDIT_BOOK {
  type: constants.EDIT_BOOK_t;
  data: editBook;
}
export interface GET_URI {
  type: constants.GET_URI_t;
  data: getUri;
}


export type All = SET_SHELF | EDIT_BOOK | GET_URI;

//同步action，就是指action的值为Object类型的一般对象
export const set_shelf = (data: setBookshelf) => ({
  type: constants.SET_SHELF,
  data,
});

export const edit_book = (data: editBook) => ({
  type: constants.EDIT_BOOK,
  data,
});
export const GET_URI = (data: getUri) => ({
  type: constants.GET_URI,
  data,
});
