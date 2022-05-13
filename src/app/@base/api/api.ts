/** 接口請求重試次數 */
export const API_RETRY_TIMES = 3;

export class ApiRes {
  /**
   * Api subscribe 格式
   * @param data 取得資料
   * @param code 系統代號
   * @param ok 查詢狀態
   */
  constructor(public data: any, public code: number, public ok: boolean) {}
}

export class ApiToken {
  /**
   * 接口基本資料 (token)
   * @param TokenID 密鑰
   */
  constructor(public TokenID: string) {}
}

export class ApiBase {
  /**
   * 經銷商基本參數
   * @param DistySeq SEQ
   */
  constructor(public DistySeq: number) {}
}

/** 後端接口返回格式 */
export interface ApiEcho {
  /** 取得資料 */
  Data: any;

  /** 系統代號 */
  Code: number;

  /** 查詢狀態 */
  Success: boolean;

  /** 回傳訊息 */
  Msg: string;
}
