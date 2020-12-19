import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HelpDialogComponent } from './dialog.component';
let HelpComponent = class HelpComponent {
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
        const dialogRef = this.dialog.open(HelpDialogComponent, {
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
], HelpComponent.prototype, "helpitem", void 0);
tslib_1.__decorate([
    Input()
], HelpComponent.prototype, "fallback", void 0);
tslib_1.__decorate([
    Input()
], HelpComponent.prototype, "color", void 0);
HelpComponent = tslib_1.__decorate([
    Component({
        selector: 'app-help',
        template: `<button mat-icon-button [color]="color" (click)="helpButton()"><mat-icon>help_outline</mat-icon></button>`,
    })
], HelpComponent);
export { HelpComponent };
//# sourceMappingURL=help.component.js.map