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
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PytBaseComponent } from './base.input.component';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PytDatePickerInputComponent),
    multi: true
};
let PytDatePickerInputComponent = class PytDatePickerInputComponent extends PytBaseComponent {
    constructor(formGroupDir) {
        super(formGroupDir);
        this.startView = 'month'; // | 'year' | 'multi-year';;
        this.touchUi = false;
        // TODO: Check why thisis needed
        this.disabled = false;
        return;
    }
    getDefaultValue() {
        return new Date();
    }
    dateChange($event) {
        return;
    }
};
tslib_1.__decorate([
    Input()
], PytDatePickerInputComponent.prototype, "disabled", void 0);
PytDatePickerInputComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'pyt-datepicker-input-box',
        template: `<div class="form">
    <mat-form-field color="accent">
        <input id="{{ id }}_DATE"
                class="custom-input"
                matInput [matDatepicker]="datepicker"
                id="{{ id }}"
               [attr.readonly]="readonly"
               [attr.readonly]="disabled"
                placeholder="{{ placeholder }}"
                [formControl]="control"
                [min]="minDate"
                [max]="maxDate"
                (dateChange)="dateChange( $event )">
        <mat-datepicker-toggle matSuffix [for]="datepicker">
        </mat-datepicker-toggle>
        <mat-datepicker #datepicker
                        [disabled]="disabled"
                        [touchUi]="touchUi"
                        startView="{{startView}}">
        </mat-datepicker>
        <mat-icon matPrefix *ngIf="prefixType == 'icon'">{{ prefix }}</mat-icon>
        <mat-icon matSuffix *ngIf="suffixType == 'icon'">{{ suffix }}</mat-icon>
        <span matPrefix *ngIf="prefixType == 'text'">{{ prefix }}</span>
        <span matSuffix *ngIf="suffixType == 'text'">{{ suffix }}</span>
    </mat-form-field>
</div>`,
        styles: ['custom-input { width: 100%; }',
            'mat-form-field { width: 100%; }'],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        animations: [trigger('visibilityChanged', [
                state('true', style({ 'height': '*', 'padding-top': '4px' })),
                state('false', style({ height: '0px', 'padding-top': '0px' })),
                transition('*=>*', animate('200ms'))
            ])
        ]
    })
], PytDatePickerInputComponent);
export { PytDatePickerInputComponent };
//# sourceMappingURL=date.picker.component.js.map