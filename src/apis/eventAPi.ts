import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class EventAPI {
  HandleEvent = async (
    url: string,
    data?: any,
    //Phương thức
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    //Gọi BASE_URL từ appInfos.ts
    return await axiosClient(`/events${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const eventAPI = new EventAPI();
export default eventAPI;
