import request from '../utils/request.js';

// 获取书源
export function getSource(id) {
  return request(`/api/toc?view=summary&book=${id}`);
}

// 获取章节列表
export function getChapterList(id) {
  return request(`/api/toc/${id}?view=chapters`);
}

// 获取章节内容
export function getChapter(link) {
  return request(`/chapter/${link}?k=2124b73d7e2e1945&t=1468223717`);
}

// 搜索书籍
export function search(query) {
  console.log(`https://www.121du.net/search/?wd=${query}`);
  return request(`https://www.121du.net/search/?wd=${query}`);
}

export function getDetail(id) {
  return request(`/api/book/${id}`);
}
