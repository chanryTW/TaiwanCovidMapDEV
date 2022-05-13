import { AbstractControl, FormGroup, NgForm } from '@angular/forms';

/** 網站名稱 */
export const WEB_NAME = 'YAGEO';

/** 移動裝置尺寸，搜尋會使用到 */
export const BROWSER_MOBILE = 768;

export const KEYBOARD_DELAY_TIME = 650;

export const KEYBOARD_DELAY_TIME_BATCH = 500;

/** 語系類型 */
export type LANG_TYPE = 'zh-tw' | 'zh-cn' | 'en-us';

/** 語系列表類型 */
export type LANG_LIST = {
  /** ID */
  id: LANG_TYPE;

  /** 名稱 */
  name: string;

  /** 日期格式 */
  dateFormat: string;
};

/** 語系列表 */
export const LANGS: LANG_LIST[] = [
  {
    id: 'zh-tw',
    name: '繁中',
    dateFormat: 'yyyy-MM-dd',
  },
  {
    id: 'zh-cn',
    name: '简中',
    dateFormat: 'yyyy-MM-dd',
  },
  {
    id: 'en-us',
    name: 'English',
    dateFormat: 'dd/MM/yy',
  },
];

/** 頁面設置 */
export interface PageData {
  /** 側欄圖標 */
  icon?: string;

  /** 權限代號 */
  code?: string;
}

/**
 * 後端布林值
 *
 * 	0: 否
 * 	1: 是
 */
export type YN = 0 | 1;

/**
 * 後端 新增刪除
 *
 * 	1: 新增
 * 	-1: 刪除
 */
export type AD = 1 | -1;

/** 功能權限 */
export interface Auth {
  /** 功能編碼 */
  FunctionCode: string;

  /** 是否檢視 */
  IsView: YN;

  /** 是否新增|修改|刪除 */
  IsEdit: YN;

  /** 是否啟用代理人(0:否 1:是) */
  IsSubstituteEnabled: YN;

  /** 代理人使用者序號 */
  SubstituteUserSeq: number;

  /** 代理人有效期起 */
  VALIDITY_START_DATE: string;

  /** 代理人有效期止 */
  VALIDITY_END_DATE: string;
}

// 經銷商
export interface Disty {
  /** 經銷商序號 */
  DistySeq: number | null;

  /** 經銷商名稱 */
  DistyName: string;

  /** 分公司資料清單 */
  BranchData: Branch[];

  /** 幣別 */
  OptionSeq: string;
}

export interface Branch {
  /** 分公司序號 */
  BranchSeq: number;

  /** 分公司地點 */
  BranchLocation: string;
}

/** 終端客戶 */
export interface EndCust {
  /** 終端客戶序號 */
  EndCustomerSeq: number;

  /** 終端客戶名稱 */
  EndCustomerName: string;

  /** 終端客戶代碼 */
  EndCustomerCode: string;
}

export class EndCustClass {
  constructor(public EndCustomerSeq: string, public EndCustomerName: string) {}
}

/** OEM客戶 */
export interface OemCust {
  /** OEM客戶序號 */
  OEMCustomerSeq: number;

  /** OEM客戶名稱 */
  OEMCustomerName: string;
}

/**
 * 使用者類型
 *
 * 	0: 報價團隊
 * 	1: 現場經理(FM)
 * 	2: 國巨業務
 * 	3: 經銷商
 * 	4: 其他
 * 	5: 經銷商主帳號
 * 	6: 價差申請人員
 */
export const USER_TYPE = [0, 1, 2, 3, 4, 5, 6] as const;

/**
 * 使用者類型
 *
 * 	0: 報價團隊
 * 	1: 現場經理(FM)
 * 	2: 國巨業務
 * 	3: 經銷商
 * 	4: 其他
 * 	5: 經銷商主帳號
 * 	6: 價差申請人員
 */
export type USER_TYPE_TYPE = typeof USER_TYPE[number];

/** 內部使用者資料 */
export interface InternalUserList {
  /**
   * 使用者類型
   *
   * 	0: 報價團隊
   * 	1: 現場經理(FM)
   * 	2: 國巨業務
   * 	3: 經銷商
   * 	4: 其他
   * 	5: 經銷商主帳號
   * 	6: 價差申請人員
   */
  UserType: USER_TYPE_TYPE;

  /** 使用者序號 */
  UserSeq: number;

  /** 使用者名稱 */
  UserName: string;

  /** 部門名稱 */
  DepartmentName: string;
}

/** ErrorCode */
export const ERROR_CODE_LIST = [
  '1',
  '3',
  '4',
  '5',
  '6',
  '14',
  '26',
  '27',
  '28',
  '39',
  '**',
] as const;

/**
 * 詢價類型(RFQ cycle)
 *
 * 	A: Yearly
 * 	Q: Quarterly
 * 	H: Bi-annual
 * 	M: Monthly
 * 	R: Randomly
 * 	L: Local disty
 */
export const QUTN_TYPE_LIST = ['A', 'Q', 'H', 'M', 'R', 'L'] as const;

/**
 * 詢價類型(RFQ cycle)
 *
 * 	A: Yearly
 * 	Q: Quarterly
 * 	H: Bi-annual
 * 	M: Monthly
 * 	R: Randomly
 * 	L: Local disty
 */
export type QUTN_TYPE_LIST_TYPE = typeof QUTN_TYPE_LIST[number];

/**
 * 詢價類型(RFQ cycle)
 *
 * 	A: Yearly
 * 	Q: Quarterly
 * 	H: Bi-annual
 * 	S: spot deal
 * 	D: Daily
 */
export const OEM_QUTN_TYPE_LIST = ['A', 'Q', 'H', 'S', 'D'] as const;

/**
 * 詢價類型(RFQ cycle)
 *
 * 	A: Yearly
 * 	Q: Quarterly
 * 	H: Bi-annual
 * 	S: spot deal
 * 	D: Daily
 */
export type OEM_QUTN_TYPE_LIST_TYPE = typeof OEM_QUTN_TYPE_LIST[number];

/**
 * 報價區間季度類型
 */
export const RFQPeriodQuarterly_A_LIST = ['A-Q1', 'A-Q2', 'A-Q3', 'A-Q4'] as const;
export const RFQPeriodQuarterly_Q_LIST = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
export const RFQPeriodQuarterly_H_LIST = ['1H-Q1', '1H-Q2', '2H-Q3', '2H-Q4'] as const;
export const RFQPeriodQuarterly_ALL_LIST = ['Q1', 'Q2', 'Q3', 'Q4', '1H-Q1', '1H-Q2', '2H-Q3', '2H-Q4', 'A-Q1', 'A-Q2', 'A-Q3', 'A-Q4', 'H1', 'H2', 'YEAR'] as const;

/**
 * 建立類型
 *
 * 	0: 手動建立
 * 	1: Excel上傳
 * 	2: 寄送email
 */
export type CREAT_TYPE = 0 | 1 | 2;

/**
 * 選單資料類型
 *
 * 	DP      : 部門
 * 	CURRENCY: 幣別
 * 	DQR     : 經銷商報價駁回原因
 * 	OQR     : OEM報價駁回原因
 * 	DQRR    : 經銷商報價退回原因
 * 	SDR     : 經銷商價差申請駁回原因
 * 	SDRR    : 經銷商價差申請退回原因
 */
export const OPTION_TYPES_LIST = ['DP', 'CURRENCY', 'DQR', 'OQR', 'DQRR', 'SDR', 'SDRR'] as const;

/**
 * 選單資料類型
 *
 * 	DP      : 部門
 * 	CURRENCY: 幣別
 * 	DQR     : 經銷商報價駁回原因
 * 	OQR     : OEM報價駁回原因
 * 	DQRR    : 經銷商報價退回原因
 */
export type OPTION_TYPES_LIST_TYPE = typeof OPTION_TYPES_LIST[number];

export class OptionData {
  /**
   * 取得選單資料
   * @param OptionType 類型
   */
  constructor(public OptionType: OPTION_TYPES_LIST_TYPE) {}
}

/** 資料共用 */
export interface OptionList {
  /** 選單序號 */
  OptionSeq: string;

  /** 選單類型 */
  OptionType: OPTION_TYPES_LIST_TYPE;

  /** 選單文字名稱 */
  OptionText: string;

  /** 選單值(目前只有稅額才有) */
  OptionValue: string;
}

/** 簽核資料清單 */
export interface SignList {
  /** 簽核序號 */
  SignSeq: number;

  /** 簽核標題 */
  SignTitle: string;
}

/** 時區列表 */
export const TIMEZONE_LIST = Array.from({ length: 27 }, (v, k) => k + -12);

/**
 * 判斷是否為群組
 * @param control AbstractControl
 */
export function isFormGroup(control: AbstractControl): control is FormGroup {
  return !!(control as FormGroup).controls;
}

/**
 * 獲取表單所有的錯誤集合
 * @param control AbstractControl
 */
export function collectErrors(control: AbstractControl): any | null {
  if (isFormGroup(control)) {
    return Object.entries(control.controls).reduce((acc: any, [key, childControl]) => {
      const childErrors = collectErrors(childControl);
      if (childErrors) {
        acc = [...acc, { [key]: childErrors }];
      }
      return acc;
    }, []);
  } else {
    return control.errors;
  }
}

/**
 * 取得錯誤訊息類型文字
 * @param ary array
 * @returns [錯誤標題]
 */
export function errorMsg(ary: any[]): null | string[] {
  if (ary.length > 0) {
    const list: any[] | null = [];
    ary.map((item) => {
      const ctrls = Object.values(item);
      ctrls.map((items) => {
        // 為陣列
        if (Array.isArray(items)) {
          items.map((eles) => {
            list.push(Object.values(eles)[0]);
          });
        } else {
          list.push(items);
        }
      });
    });

    const set = new Set();
    // 取得不重複的錯誤訊息
    const result = list.filter((item) =>
      !set.has(Object.keys(item)[0]) ? set.add(Object.keys(item)[0]) : false
    );
    return result.map((item) => Object.keys(item)[0]);
  } else {
    return null;
  }
}

/**
 * 判斷表單驗證
 * @param forms NgForm
 */
export function formValid(forms: NgForm | any, ctrl?: boolean): boolean {
  if (forms.valid) {
    // 都沒有出現錯誤，就直接通過
    return true;
  } else {
    // 如果有錯誤，先判斷是屬於哪一個類型的錯誤
    // 如果有出現必填錯誤，則不能送出
    if (errorMsg(collectErrors(ctrl ? forms : forms.form))?.includes('required')) {
      return false;
    } else {
      // 如果沒有出現必填錯誤，則可送出
      return true;
    }
  }
}

/**
 * 找尋陣列相同或不相同的值
 * @param list 列表
 * @param key 比對的物件名稱
 * @param type 0: 不同; 1:相同
 */
export function FindArrayRepeatOrDiff(list: any, key: string, type: 0 | 1): Array<any> {
  /** 不同的值 */
  const diff = new Set();

  /** 相同的值 */
  const repeat = new Set();

  list.forEach((item: any) => {
    diff.has(item[key]) ? repeat.add(item[key]) : diff.add(item[key]);
  });

  return type === 0 ? [...diff] : [...repeat];
}

/** input數字不能點選的按鍵 */
export const NOT_ALLOW_KEYBOARD = [
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'Escape',
  'Shift',
  'Alt',
  '`',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
];

/** 數字鍵可允許送出 */
export const ALLOW_NUM_KEYBOARD = ['ArrowDown', 'ArrowUp', '.'];

export const DEL_KEYBOARD = ['Backspace', 'del'];

/** 文字不允許的按鈕 */
export const NOT_ALLOW_TXT_KEYBOARD = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

export const NUMBER_ONLY = /[0-9]|\./;

/** 轉換百分比給後端 */
export function percentToNumber(num: number): number {
  return Number(num / 100);
}

/** 四捨五入 */
export function mathRoundTo(num: number | string | null, bit: number = 2): number {
  const bits = Math.pow(10, bit);
  return Math.round(Number(num) * bits) / bits;
}

/**
 * 有效的key值
 * @param key any
 * @param object obj
 */
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

/**
 * 陣列分群組
 * @param xs list
 * @param key 要比對的key
 */
export const groupBy = (xs: any, key: any) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
