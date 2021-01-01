import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
let GcFooterComponent = class GcFooterComponent {
    constructor() {
        this.footerText = 'Webapp2 Python-flask angular core, \u00A9 Copyright 2017-2020 All rights reserved by Marc Bertens-Nguyen';
        if (environment.footerText !== undefined && environment.footerText != null) {
            this.footerText = environment.footerText;
        }
        return;
    }
};
GcFooterComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-footer',
        template: `<footer>{{footerText}}</footer>`,
        styles: ['footer { padding: 10px; }']
    })
], GcFooterComponent);
export { GcFooterComponent };
//# sourceMappingURL=footer.component.js.map