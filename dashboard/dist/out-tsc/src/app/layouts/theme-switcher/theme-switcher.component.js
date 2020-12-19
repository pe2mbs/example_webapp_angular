import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ThemeSwitcherComponent = class ThemeSwitcherComponent {
    constructor() {
        this.themes = [
            { label: 'Light', value: 'light-theme' },
            { label: 'Dark', value: 'dark-theme' },
            { label: 'Extra', value: 'extra-theme' },
            { label: 'Purple', value: 'purple-theme' },
        ];
        this.themeIndex = 0;
        // let's define default theme
        this.themeColor = 'light-theme';
        return;
    }
    ngOnInit() {
        this.setDefaultTheme();
        return;
    }
    setDefaultTheme() {
        // if theme is stored in storage - use it
        if (localStorage.getItem('pxTheme')) {
            // set theme color to one from storage
            this.themeColor = localStorage.getItem('pxTheme');
            this.themeIndex = this.themes.findIndex(x => x.value === this.themeColor);
            // add that class to body
            const body = document.getElementsByTagName('body')[0];
            body.classList.add(this.themeColor);
        }
        return;
    }
    get theme() {
        return (this.themes[this.themeIndex].label);
    }
    selectTheme($event) {
        console.log($event);
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove(this.themeColor);
        this.themeColor = $event;
        body.classList.add(this.themeColor);
        // save it to local storage
        localStorage.setItem('pxTheme', this.themeColor);
        return;
    }
    themeSwitcher() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove(this.themeColor);
        // switch theme
        this.themeIndex++;
        if (this.themeIndex === this.themes.length) {
            this.themeIndex = 0;
        }
        this.themeColor = this.themes[this.themeIndex].value;
        body.classList.add(this.themeColor);
        // save it to local storage
        localStorage.setItem('pxTheme', this.themeColor);
    }
};
ThemeSwitcherComponent = tslib_1.__decorate([
    Component({
        selector: 'app-theme-switcher',
        templateUrl: './theme-switcher.component.html'
    })
], ThemeSwitcherComponent);
export { ThemeSwitcherComponent };
//# sourceMappingURL=theme-switcher.component.js.map