import { WEB_NAME } from './shared';
import { jsonToStr } from './text';

/**
 * 所有存取的名稱處理
 * @param name SESSION_NAME | LOCAL_STORAGE_NAME
 * @returns DMS_TEXT
 */
export const KEEP_NAME = (name: string) => WEB_NAME + '_' + name.toUpperCase();

/**
 * session 名稱
 *
 * 	user: 使用者登入
 * 	menu: 選單
 */
export type SESSION_NAME_NOT_IN_BASE = 'user' | 'menu' | 'hub';

/**
 * session Dashboard
 *
 */
export type DASHBOARD_NAME =
  | 'dashboardAllTotal'
  | 'dashboardRegionTotal'
  | 'dashboardClientO'
  | 'dashboardClientD'
  | 'dashboardProduct';

/** 合併 base 與 單獨設置的名稱 */
export type SESSION_NAME = SESSION_NAME_NOT_IN_BASE | DASHBOARD_NAME;

/**
 * 設置LocalStorage
 *
 * 	keepAccount: 記住帳號
 * 	lang: 語系
 * 	fontSize: 文字大小
 * 	theme: 主題
 * 	nav: 選單(三種樣式)
 * 	menu: 選單
 * 	Dashboard_DateRange: dashboard
 */
export type LOCAL_STORAGE_NAME =
  | 'keepAccount'
  | 'lang'
  | 'fontSize'
  | 'theme'
  | 'nav'
  | 'Dashboard_DateRange';

/**
 * 設置session
 * @param name 名稱
 * @param val 值
 */
export function setSession(name: SESSION_NAME, val: any): void {
  sessionStorage.setItem(KEEP_NAME(name), val);
}

/**
 * 獲取session
 * @param name 名稱
 * @returns any 物件或是字串
 */
export function getSession(name: SESSION_NAME): any {
  const ele = sessionStorage.getItem(KEEP_NAME(name));
  return ele ? jsonToStr(ele) : null;
}

/**
 * 移除session
 * @param name 名稱
 */
export function removeSession(name: SESSION_NAME): void {
  sessionStorage.removeItem(KEEP_NAME(name));
}

/**
 * 設置LocalStorage
 * @param name 名稱
 * @param val 值
 */
export function setLocalStorage(name: LOCAL_STORAGE_NAME, val: any): void {
  localStorage.setItem(KEEP_NAME(name), val);
}

/**
 * 獲取LocalStorage
 * @param name 名稱
 * @returns any 物件或是字串
 */
export function getLocalStorage(name: LOCAL_STORAGE_NAME): any {
  return localStorage.getItem(KEEP_NAME(name));
}

/**
 * 移除LocalStorage
 * @param name 名稱
 */
export function removeLocalStorage(name: LOCAL_STORAGE_NAME): void {
  localStorage.removeItem(KEEP_NAME(name));
}
