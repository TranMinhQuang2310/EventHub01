import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class AuthAPi {
  HandleAuthentication = async (
    url: string,
    data?: any,
    //Phương thức
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    //Gọi BASE_URL từ appInfos.ts
    return await axiosClient(`/auth${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const authenticationAPI = new AuthAPi();
export default authenticationAPI;
