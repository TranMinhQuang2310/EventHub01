import {appInfo} from '../constants/appInfos';
import {numberToString} from './numberToString';

//Gọi từ file appInfo.ts
export class DateTime {
  static GetTime = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getHours())}:${numberToString(
      date.getMinutes(),
    )}`;
  };

  static GetDate = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getDate())} ${
      appInfo.monthName[date.getMonth()]
    }, ${date.getFullYear()}`;
  };

  static GetDayString = (num: number) => {
    const date = new Date(num);

    return `${appInfo.dayNames[date.getDay()]}, ${
      appInfo.monthName[date.getMonth()]
    } ${numberToString(date.getDate())}`;
  };
}
