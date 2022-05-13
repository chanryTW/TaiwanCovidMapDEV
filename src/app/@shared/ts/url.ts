/** 首頁 */
export const INDEX_URL = '/';

/** dashboard */
export const DASHBOARD_URL = 'dashboard';

/** 預設的首頁 */
export const HOME_URL = DASHBOARD_URL;

/** 登入頁 */
export const LOGIN_URL = '/login';

/** 登出頁面 */
export const LOGOUT_URL = '/logout';

/** img 路徑 */
export const IMG_URL = 'assets/image/';

/** 找不到 */
export const NOT_FOUND_URL = 'not-found';

/** 使用者設定 */
export const USER_SETTING_URL = 'user';

export const FORGET_PSD_URL = 'forgot-password';

export const DISTY_SETTING_URL = 'disty-setting';

/** 系統設定 */
export const SYS_SETTING_URL = 'sys';

/** 區域設定 */
export const SYS_REGION_URL = 'region';

/** 經銷商設定 */
export const SYS_DISTY_URL = 'disty';

/** 經銷商簽核設定 */
export const SYS_DISTY_SIGN_URL = 'disty-sign';

/** 物料管理 */
export const SYS_PRODUCT_URL = 'product';

/** 產品線簽核設定 */
export const SYS_PRODUCT_SIGN_URL = 'productLine';

/** 權限群組 */
export const SYS_AUTH_GROUP_URL = 'group';

/** 選單設定(駁回原因罐頭語) */
export const SYS_REJECT_OPTION_URL = 'option';

/** OEM */
export const SYS_OEM_CUSTOMER_URL = 'oem-customer';

/** OEM簽核設 */
export const SYS_OEM_SIGN_URL = 'oem-sign';

/** OEM等級比例設定 */
export const SYS_OEM_GRADE_RATIO_URL = 'oem-grade-ratio';

/** 系統參數 */
export const SYS_PARM_URL = 'parm';

/** 明細 */
export const SPEC_URL = 'detail';

/** 傳遞的唯一值 */
export const SPEC_SEQ_URL = ':seq';

/** 新增 */
export const ADD_URL = 'add';

/** 歷史資料 */
export const HISTORY_URL = 'history';

/** 錯誤 */
export const ERROR_URL = 'error';

/** 議價 */
export const BARGAIN_URL = 'bargain';

/** 經銷商詢價 */
export const DIR_INQUIRY_URL = 'dlr-inquiry';

/** 經銷商報價 */
export const DIR_QUTN_URL = 'dlr-qutn';

/** OEM報價管理(業務) */
export const OEM_INQUIRY_URL = 'oem-inquiry';

/** OEM報價管理(內部) */
export const OEM_QUTN_URL = 'oem-qutn';

/** 價差申請詢價 */
export const SD_CLAIM_INQUIRY_URL = 'sd-claim-inquiry';

/** 價差申請報價 */
export const SD_CLAIM_QUTN_URL = 'sd-claim-qutn';

/** 價差申請 */
export const SD_CLAIM_URL = 'sd-claim';

/** 價差申請簽核設定 */
export const SD_CLAIM_SIGN_URL = 'sd-claim-sign';

/** 不需要判斷權限的頁面 */
export const NOT_AUTH = ['**', NOT_FOUND_URL, USER_SETTING_URL, 'backends'];

/**
 * 產生路徑
 * @param url 路徑名稱
 */
export function URLToString(url: string[]): string {
  return `/${url.join('/')}`;
}
