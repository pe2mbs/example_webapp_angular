import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
let FooterComponent = class FooterComponent {
    constructor() {
        this.footerText = 'Webapp2 Python-flask angular core, &copy; 2019-2020 All rights reserved by Marc Bertens-Nguyen';
        if (environment.footerText !== undefined && environment.footerText != null) {
            this.footerText = environment.footerText;
        }
        return;
    }
};
FooterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-footer',
        template: `<footer>{{footerText}}</footer>`,
        styles: ['footer { padding: 10px; }']
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map