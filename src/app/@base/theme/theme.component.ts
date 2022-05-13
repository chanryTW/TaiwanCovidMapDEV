import { Component, OnInit, Input } from '@angular/core';
import { THEME } from './theme';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
})
export class ThemeComponent implements OnInit {
  /** 現在主題 */
  selected$ = this.themeService.selectedTheme$;

  /** 主題列表 */
  themes = THEME;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  /** 主題切換 */
  switch(): void {
    this.themeService.switchTheme(
      this.themeService.themeName === this.themes[0] ? this.themes[1] : this.themes[0]
    );
  }
}
