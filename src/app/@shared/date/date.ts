export class Date {}

/**
 * 系統日期地區
 * 請參照 angular formatDate
 */
export const DATE_LOCALE = 'en-US';

/** 顯示日期格式 (2020-02-02) */
export const DATE_FORMATE = 'yyyy-MM-dd';

/** 顯示日期格式 (2002-02) */
export const DATE_FORMATE_Y_M = 'yyyy-MM';

/** 顯示日期格式 (02-02) */
export const DATE_FORMATE_M_D = 'MM-dd';

/** 顯示簡略時間日期格式 (02-02 02:02) */
export const DATE_FORMATE_MD_HM = 'MM-dd HH:mm';

/** 顯示年份時間日期格式 (2020-02-02 01:01) */
export const DATE_FORMATE_DATETIME = 'yyyy-MM-dd HH:mm';

/** 顯示日期格式 (2020-02-02) */
export const DATE_INPUT_DATE = 'yyyy-MM-dd';

/** HTML input 時間日期格式 (2020-02-02T01:01)  */
export const DATE_INPUT_DATETIME = 'yyyy-MM-ddTHH:mm';

/**
 * 保留清單
 * 登出時保留使用者設定
 */
export const LOCAL_STORAGE_SAVE = ['uiLang', 'uiAside', 'uiTheme', 'uiFontSize'];

/**
 * 日期格式化類型
 *
 * 	date:     2020-02-02
 * 	datetime: 2020-02-02 12:12
 * 	m-d:      02-02
 * 	y-m:      2020-02
 */
export type DateFormate = 'date' | 'datetime' | 'm-d' | 'md-hm' | 'y-m';

/**
 * 日期格式化類型
 *
 * 	date    : 2020-02-02
 * 	datetime: 2020-02-02 12:12
 */
export type DateInput = 'date' | 'datetime';
