/** 文字處理的function */

/**
 * 驗證是否為 JSON 字串
 * @param text JSON 字串
 */
export function testJson(text: string): boolean {
  if (text) {
    const r1 = new RegExp('\\["\\/bfnrtu]', 'g');
    const r2 = new RegExp(
      '"[^"\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',
      'g'
    );
    const r3 = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g');
    return /^[\],:{}\s]*$/.test(text.replace(r1, '@').replace(r2, ']').replace(r3, ''));
  }
  return false;
}

/**
 * JSON 字串轉為物件
 * @param text JSON 字串
 */
export function jsonToStr(text: string): any | string {
  return testJson(text) ? JSON.parse(text) : text;
}

/**
 * 轉換為駝峰式
 * @param $str: 要處理的字串
 * @reture 駝峰式字串
 */
export function camelCase($str: string): string {
  const r = new RegExp($str.indexOf('/') > -1 ? '\\/(\\w)' : '-(\\w)', 'g');
  $str = $str.replace(
    // 是否使用斜線分隔
    r,
    ($0, $1) => {
      return $1.toUpperCase();
    }
  );
  return $str;
}

/**
 * 清除空欄位 ( null、undefined )
 * @param obj [obj] 傳入資料
 * @link https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
 * @returns object
 */
export function jsonClear(obj: any): object {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const propName of propNames) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }

  // 如果有子項目 Data
  if (obj.Data) {
    // 檢查是否有空值
    obj.Data = jsonClear(obj.Data);
  }

  return obj;
}

/**
 * 複製資料
 * @param list: any
 */
export function clone(list: any): any {
  return JSON.parse(JSON.stringify(list));
}

/**
 * 關鍵字多重搜尋格式
 * @param keyword 關鍵字
 */
export function keyword(txt: string | null): string[] {
  // 使用空白當作分隔符號
  return txt ? txt.split(' ').filter((item) => item) : [];
}

/**
 * 轉換字串的null
 * @param txt txt
 */
export function stringNull(txt: string | null): string | null {
  // 使用空白當作分隔符號
  return txt === 'null' || txt === undefined ? null : txt;
}

/**
 * 日期新增"-"
 * @param value: 日期格式 00000000
 * @returns string: 0000-00-00
 */
export function translateDate(value: string): string {
  return value && value.indexOf('-') === -1 && value !== ''
    ? value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2)
    : value;
}

/**
 * 日期轉換時間，比大小
 * @param val: date
 * @returns number
 */
export function calculateDate(val: string): number {
  return new Date(translateDate(val)).getTime();
}
