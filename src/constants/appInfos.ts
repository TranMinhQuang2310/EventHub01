import {Dimensions} from 'react-native';

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  //Lấy địa chỉ IP : terminal => Open terminal -> gõ ipconfig -> copy IPv4 Address trong phần “Connection-specific DNS Suffix  . :”
  //3001 là Port đã tạo bên server
  //BASE_URL: 'http://192.168.109.1:3001',

  BASE_URL: 'http://192.168.1.14:3001', //=> Của máy thật
  monthName: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};
