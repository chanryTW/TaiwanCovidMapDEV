import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { getLocalStorage, setLocalStorage } from 'src/app/@shared/ts/keep';
import { THEME_CONFIG, THEME_TYPE } from './theme';

/** 主題切換 */

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  /** 停止監聽狀態 */
  private stopListening$ = new Subject<boolean>();

  /** 當前選擇的主題 */
  private selectedTheme: BehaviorSubject<THEME_TYPE> = new BehaviorSubject(this.themeName);

  /** 回報現在主題 */
  selectedTheme$: Observable<string> = this.selectedTheme.asObservable();

  /**
   * @param doc 注入 DOCUMENT
   */
  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.init();
  }

  /** 獲取主題名稱 */
  get themeName(): THEME_TYPE {
    const keep = getLocalStorage('theme');

    // 如果沒有，則使用預設的主題
    return keep || THEME_CONFIG.default;
  }

  /**
   * 轉換主題
   * @param className 主題名稱
   */
  switchTheme(className: THEME_TYPE): void {
    setLocalStorage('theme', className);
    this.selectedTheme.next(className);
  }

  /** 初始化 */
  private init(): void {
    /** 除了預設的值 */
    const nonDefaultThemes: string[] = THEME_CONFIG.themes.filter(
      (c) => c !== THEME_CONFIG.default
    );

    this.selectedTheme
      .pipe(
        tap((theme) => {
          // 如果不是預設值，要把預設值移除
          this.removeClasses(
            theme === THEME_CONFIG.default
              ? nonDefaultThemes
              : [THEME_CONFIG.default, ...nonDefaultThemes]
          );
          const toAdd = [...(theme ? [theme] : [])];
          this.addClasses(toAdd);
        }),
        takeUntil(this.stopListening$)
      )
      .subscribe();
  }

  /**
   * 移除class name
   * @param arr class name
   */
  private removeClasses(arr: string[]): void {
    this.targetElement.classList.remove(...arr);
  }

  /**
   * 新增class name
   * @param arr class name
   */
  private addClasses(arr: string[]): void {
    this.targetElement.classList.add(...arr);
  }

  /** 獲取 HTMLElement */
  private get targetElement(): HTMLElement {
    let elem!: HTMLElement | null;
    if (THEME_CONFIG.targetElementSelector) {
      elem = this.doc.querySelector(THEME_CONFIG.targetElementSelector);
      if (!elem) {
        console.warn('ERROR');
      }
    }
    if (!elem) {
      elem = this.doc.documentElement;
    }
    return elem;
  }

  ngOnDestroy(): void {
    this.stopListening$.next(true);
  }
}
