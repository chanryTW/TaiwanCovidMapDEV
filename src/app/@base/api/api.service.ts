import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiEcho, ApiRes, API_RETRY_TIMES } from './api';

/**
 * API接口 \
 * 系統基本http request
 */

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * POST方法
   * @param url API名稱
   * @param param 入參
   * @returns ApiRes (data, code, ok)
   */
  post(url: string, param?: object | null): Observable<ApiRes> {
    // 置入後端接口格式、網址、參數、傳輸協定
    return this.http.post<ApiEcho>(url.indexOf('http') === -1 ? environment.path + '/' + url : url, param ? param : {}).pipe(
      // 接口格式重新整理
      map((data) => new ApiRes(data.Data, data.Code, data.Success)),
      // 最大重試次數
      retry(API_RETRY_TIMES),
      catchError(this.handleError)
    );
  }

  /**
   * GET方法
   * @param url API名稱
   * @param option 選項
   * @returns ApiRes (data, code, ok)
   */
  get(url: string, option?: object | null): Observable<any> {
    // 置入後端接口格式、網址、參數、傳輸協定
    return this.http.get<ApiEcho>(url.indexOf('http') === -1 ? environment.path + '/' + url : url, option ? option : {}).pipe(
      // 最大重試次數
      retry(API_RETRY_TIMES),
      catchError(this.handleError)
    );
  }

  /**
   * 錯誤訊息處理
   * @param error 錯誤
   */
  handleError(error: any): Observable<never> {
    let errorMessage = '';
    errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(errorMessage);
  }
}
