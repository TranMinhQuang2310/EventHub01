import axios from 'axios';
//Cài thư viện : yarn add query-string
import queryString from 'query-string';
import {appInfo} from '../constants/appInfos';

const axiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

//Request
axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    //Nếu người dùng có truyền thêm thì lấy
    ...config.headers,
  };

  //Nếu người dùng truyền thêm data => lấy data đó
  config.data;

  return config;
});

//Response
axiosClient.interceptors.response.use(
  res => {
    //Trường hợp data API trả về đúng
    if (res.data && res.status === 200) {
      return res.data;
    }
    //Nếu lỗi => Thông báo lỗi
    throw new Error('Error');
  },
  //Trường hợp data API trả về sai
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);

export default axiosClient;
