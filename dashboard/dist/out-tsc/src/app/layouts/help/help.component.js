import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { GcHelpDialogComponent } from './dialog.component';
let GcHelpComponent = class GcHelpComponent {
    constructor(dialog, service) {
        this.dialog = dialog;
        this.service = service;
        return;
    }
    helpButton() {
        const helpdata = {
            name: this.helpitem,
            text: this.service.getHelp(this.helpitem, this.fallback),
        };
        console.log('helpButton');
        const dialogRef = this.dialog.open(GcHelpDialogComponent, {
            autoFocus: false,
            // maxHeight: '80vh',
            width: '80%',
            height: '80%',
            data: helpdata
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
        return;
    }
};
tslib_1.__decorate([
    Input()
], GcHelpComponent.prototype, "helpitem", void 0);
tslib_1.__decorate([
    Input()
], GcHelpComponent.prototype, "fallback", void 0);
tslib_1.__decorate([
    Input()
], GcHelpComponent.prototype, "color", void 0);
GcHelpComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-help',
        template: `<button mat-icon-button [color]="color" (click)="helpButton()"><mat-icon>help_outline</mat-icon></button>`,
    })
], GcHelpComponent);
export { GcHelpComponent };
//# sourceMappingURL=help.component.js.map