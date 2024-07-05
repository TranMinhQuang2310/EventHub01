import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class UserAPI {
  HandleUser = async (
    url: string,
    data?: any,
    //Phương thức
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    //Gọi BASE_URL từ appInfos.ts
    return await axiosClient(`/users${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const userAPI = new UserAPI();
export default userAPI;
