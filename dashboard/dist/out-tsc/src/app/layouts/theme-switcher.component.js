import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let GcThemeSwitcherComponent = class GcThemeSwitcherComponent {
    constructor(profileService) {
        this.profileService = profileService;
        this.themes = [
            { label: 'equensWorldline', value: 'equensworldline-theme' },
            { label: 'Light', value: 'light-theme' },
            { label: 'Dark', value: 'dark-theme' },
            { label: 'Purple', value: 'purple-theme' },
        ];
        this.themeColor = 'light-theme';
        this.profileService.changeEvent.subscribe(data => {
            if (this.themeColor !== data.theme) {
                this.selectTheme(data.theme);
            }
        });
        return;
    }
    ngOnInit() {
        this.setDefaultTheme();
        return;
    }
    setDefaultTheme() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(this.themeColor);
        return;
    }
    selectTheme(theme) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove(this.themeColor);
        this.themeColor = theme;
        body.classList.add(this.themeColor);
        this.profileService.theme = theme;
        return;
    }
};
GcThemeSwitcherComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-theme-switcher',
        template: `<button mat-button [matMenuTriggerFor]="menu"><mat-icon>format_color_fill</mat-icon></button>
<mat-menu #menu="matMenu">
	<button mat-menu-item class="{theme.value}" type="button" *ngFor="let theme of themes" 
							(click)="selectTheme( theme.value )">
		{{ theme.label }}
	</button>
</mat-menu>`
    })
], GcThemeSwitcherComponent);
export { GcThemeSwitcherComponent };
//# sourceMappingURL=theme-switcher.component.js.map