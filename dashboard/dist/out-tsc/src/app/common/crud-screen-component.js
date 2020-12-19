import * as tslib_1 from "tslib";
import { Subscribers } from "./subscribers";
import { Input } from '@angular/core';
export class ScreenBaseComponent extends Subscribers {
    constructor() {
        super();
        this.fixedValues = null;
        this.debug = false;
        return;
    }
    ngOnDestroy() {
        this.dataService.unlockRecord(this.row);
        super.ngOnDestroy();
        return;
    }
    updateFixedValues(fixed_values = null) {
        if (fixed_values != null) {
            this.fixedValues = fixed_values;
        }
        if (this.fixedValues != null) {
            for (const key in this.fixedValues) {
                if (key.endsWith('_ID')) {
                    const value = +this.fixedValues[key];
                    const ctrl = this.formGroup.get(key);
                    if (ctrl != null) {
                        ctrl.setValue(value);
                        if (!this.isEditMode()) {
                            ctrl.disable({ onlySelf: true });
                        }
                    }
                }
            }
        }
        return;
    }
    onSaveClick() {
        if (!this.isEditMode()) {
            if (this.fixedValues != null) {
                for (const key in this.fixedValues) {
                    if (key.endsWith('_ID')) {
                        const value = +this.fixedValues[key];
                        const ctrl = this.formGroup.get(key);
                        if (ctrl != null) {
                            ctrl.enable({ onlySelf: true });
                            ctrl.setValue(value);
                        }
                    }
                }
            }
            this.dataService.addRecord(this.formGroup.value);
        }
        else {
            this.dataService.updateRecord(this.formGroup.value);
        }
        window.history.back();
        return;
    }
    onCancelClick() {
        window.history.back();
        return;
    }
    isEditMode() {
        return (this.mode === 'edit');
    }
    getErrorMessage(ctrl_name) {
        let ctrl = null;
        if (typeof ctrl_name === 'string') {
            ctrl = this.formGroup.get(ctrl_name);
        }
        else {
            ctrl = ctrl_name;
        }
        if (ctrl == null || ctrl.valid) {
            return ('');
        }
        if (this.debug) {
            console.log('getErrorMessage( ctrl_name = "' + ctrl_name + '" )');
        }
        let result = 'Unknown error';
        if (ctrl.hasError('required')) {
            result = 'Required field';
        }
        else if (ctrl.hasError('email')) {
            result = 'Not a valid email';
        }
        else if (ctrl.hasError('maxlength')) {
            result = 'The data is too long, allowed (' + ctrl.errors.maxlength.requiredLength + ')';
        }
        else if (ctrl.invalid) {
            console.log(result, ctrl);
        }
        if (this.debug) {
            console.log("getErrorMessage() => " + result);
        }
        return (result);
    }
}
tslib_1.__decorate([
    Input()
], ScreenBaseComponent.prototype, "id", void 0);
tslib_1.__decorate([
    Input()
], ScreenBaseComponent.prototype, "value", void 0);
//# sourceMappingURL=crud-screen-component.js.map