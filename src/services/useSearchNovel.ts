import {useState, useLayoutEffect} from 'react';
import {getListFromSource} from '../utils/Reader';
const useSearchNovel:Function = (text: string): any[] => {
  // const [data, setData] = useState<any[]>([])
  getListFromSource(text).then(res => {
   console.log(res,"打印的数据"); 
    // setData(res);
  });
  
  
  // useLayoutEffect(() => {
  //   getListFromSource(text).then(res => {
  //     setData(res);
  //   });
  // }, [text]);
  // return data;
};
export default useSearchNovel;
