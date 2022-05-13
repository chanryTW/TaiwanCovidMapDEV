/** 主題 */
export const THEME = ['light', 'dark'] as const;
export type THEME_TYPE = typeof THEME[number];

/** 主題物件 */
export interface ThemeServiceConfig {
  /** 主題名稱陣列 */
  readonly themes: ReadonlyArray<string>;

  /** 預設值 */
  readonly default: string;

  /** HTMLElement */
  readonly targetElementSelector?: string;
}

/** 主題變數 */
export const THEME_CONFIG: ThemeServiceConfig = {
  themes: THEME,
  default: THEME[0],
};
