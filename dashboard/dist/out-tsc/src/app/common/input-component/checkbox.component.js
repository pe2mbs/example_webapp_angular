import * as tslib_1 from "tslib";
/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2020 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
#
#   This library is free software; you can redistribute it and/or modify
#   it under the terms of the GNU Library General Public License GPL-2.0-only
#   as published by the Free Software Foundation.
#
#   This library is distributed in the hope that it will be useful, but
#   WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#   Library General Public License for more details.
#
#   You should have received a copy of the GNU Library General Public
#   License GPL-2.0-only along with this library; if not, write to the
#   Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
#   Boston, MA 02110-1301 USA
#
*/
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PytBaseComponent, CUSTOM_ANIMATIONS_CONTROLE } from './base.input.component';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PytCheckboxInputComponent),
    multi: true
};
let PytCheckboxInputComponent = class PytCheckboxInputComponent extends PytBaseComponent {
    constructor(formGroupDir) {
        super(formGroupDir);
        this.labelPosition = 'after';
        this.indeterminate = false;
        return;
    }
};
tslib_1.__decorate([
    Input('labelPosition')
], PytCheckboxInputComponent.prototype, "labelPosition", void 0);
tslib_1.__decorate([
    Input('indeterminate')
], PytCheckboxInputComponent.prototype, "indeterminate", void 0);
PytCheckboxInputComponent = tslib_1.__decorate([
    Component({
        selector: 'pyt-checkbox-input-box',
        template: `<div class="form">
    <mat-checkbox class="custom-input__input"
                  id="{{ id }}"
                  [color]="color"
                  [attr.readonly]="readonly"
                  [attr.readonly]="disabled"
                  [labelPosition]="labelPosition"
                  [(indeterminate)]="indeterminate"
                  [formControl]="control">
        {{ placeholder }}
    </mat-checkbox>
</div><br/>`,
        styles: ['custom-input { width: 100%; }',
            'mat-form-field { width: 100%; }'],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        animations: CUSTOM_ANIMATIONS_CONTROLE
    })
], PytCheckboxInputComponent);
export { PytCheckboxInputComponent };
//# sourceMappingURL=checkbox.component.js.map