import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ThemeSwitcherComponent = class ThemeSwitcherComponent {
    constructor() {
        this.themes = [
            { label: 'equensWorldline', value: 'equensworldline-theme' },
            { label: 'Light', value: 'light-theme' },
            { label: 'Dark', value: 'dark-theme' },
            { label: 'Purple', value: 'purple-theme' },
        ];
        this.themeColor = 'light-theme';
        return;
    }
    ngOnInit() {
        this.setDefaultTheme();
        return;
    }
    setDefaultTheme() {
        if (localStorage.getItem('pxTheme')) {
            this.themeColor = localStorage.getItem('pxTheme');
        }
        else {
            this.themeColor = 'light-theme';
        }
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(this.themeColor);
        return;
    }
    selectTheme(theme) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove(this.themeColor);
        this.themeColor = theme;
        body.classList.add(this.themeColor);
        localStorage.setItem('pxTheme', this.themeColor);
        return;
    }
};
ThemeSwitcherComponent = tslib_1.__decorate([
    Component({
        selector: 'app-theme-switcher',
        template: `<button mat-button [matMenuTriggerFor]="menu"><mat-icon>format_color_fill</mat-icon></button>
<mat-menu #menu="matMenu">
	<button mat-menu-item class="{theme.value}" type="button" *ngFor="let theme of themes" 
							(click)="selectTheme( theme.value )">
		{{ theme.label }}
	</button>
</mat-menu>`
    })
], ThemeSwitcherComponent);
export { ThemeSwitcherComponent };
//# sourceMappingURL=theme-switcher.component.js.map