import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  DateFormate,
  DateInput,
  DATE_FORMATE,
  DATE_FORMATE_DATETIME,
  DATE_FORMATE_MD_HM,
  DATE_FORMATE_M_D,
  DATE_FORMATE_Y_M,
  DATE_INPUT_DATE,
  DATE_INPUT_DATETIME,
  DATE_LOCALE,
} from './date';

/** 日期處理 */

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  /**
   * 檢查是否為日期字串
   * @param date 日期
   */
  check(date: string): boolean {
    // 如果沒有傳入日期
    if (!date) {
      return false;
    }
    const d = new Date(date);
    // 跨瀏覽器檢測型別、如果是 Invalid Date，使用 Number.isNaN 檢查
    // stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    // stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
    return Object.prototype.toString.call(d) === '[object Date]' && !Number.isNaN(Number(d));
  }

  /**
   * 檢查是否為日期格式
   * @param date 日期
   * @param type 日期輸入類型
   */
  isDate(date: string, type: DateInput = 'date'): boolean {
    // 驗證是否為日期，並且長度與範例相同
    return (
      this.check(date) &&
      // 如果為「日期」，則根據「日期格式」的字數驗證
      // 反之，則用「時間日期格式」的字數驗證
      (type === 'date'
        ? date.length === DATE_INPUT_DATE.length
        : date.length === DATE_INPUT_DATETIME.length)
    );
  }

  /**
   * 日期格式化
   * @param day 日期
   * @param type 格式化類型
   */
  format(day: any, type: DateFormate): string | null {
    // 回傳日期
    let date = null;

    // 如果有「傳入日期」和「格式化類型」
    if (day) {
      // 判斷格式化條件
      switch (true) {
        case type === 'date':
          date = formatDate(day, DATE_FORMATE, DATE_LOCALE);
          break;
        case type === 'm-d':
          date = formatDate(day, DATE_FORMATE_M_D, DATE_LOCALE);
          break;
        case type === 'y-m':
          date = formatDate(day, DATE_FORMATE_Y_M, DATE_LOCALE);
          break;
        case type === 'md-hm':
          date = formatDate(day, DATE_FORMATE_MD_HM, DATE_LOCALE);
          break;
        case type === 'datetime':
          date = formatDate(day, DATE_FORMATE_DATETIME, DATE_LOCALE);
          break;
      }
    }

    return date;
  }

  input(date: any, type: DateInput = 'date'): string | null {
    // 驗證是否有輸入日期，沒有輸入日期則返回空值
    return date
      ? formatDate(
          // 輸入日期
          date,
          // 如果為「日期」，則根據「日期格式」格式化
          // 反之，則用「時間日期格式」格式化
          type === 'date' ? DATE_INPUT_DATE : DATE_INPUT_DATETIME,
          // 日期慣用顯示地區
          DATE_LOCALE
        )
      : null;
  }

  /**
   * 轉成後端所要的格式
   * @param date 2021-09-09
   * @returns 2021-09-09T 00:00:00
   */
  toBackEnd(date: string | null): string | null {
    return date && date.indexOf('T') === -1 ? new Date(date + ' 00:00:00').toISOString() : date;
  }

  /**
   * 後端格式轉回
   * @param date 2021-09-09T 00:00:00
   * @returns 2021-09-09
   */
  backEndToDate(date: string | null): string | null {
    return date && date.indexOf('T') > 0 ? date.slice(0, 10) : date;
  }

  /**
   * 新增一年
   * @param date new Date().toISOString()
   * @returns toISOString
   */
  addYears(date: string): string {
    return new Date(new Date().setFullYear(new Date(date).getFullYear() + 1)).toISOString();
  }
}
