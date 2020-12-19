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
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PytBaseComponent } from './base.input.component';
import * as moment_ from 'moment';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PytDateTimePickerInputComponent),
    multi: true
};
let PytDateTimePickerInputComponent = class PytDateTimePickerInputComponent extends PytBaseComponent {
    constructor(formGroupDir) {
        super(formGroupDir);
        this.disabled = false;
        this.dateUpdate = new EventEmitter();
        this.startView = 'month'; // | 'year' | 'multi-year';;
        this.touchUi = false;
        this.placeholderDate = "Select Date";
        this.placeholderTime = "Select Time";
        this.timeFormGroup = new FormGroup({ dateControl: new FormControl(),
            timeControl: new FormControl() });
        this.startView = 'month';
        this.maxDate = +moment_().add('year', -5);
        this.minDate = +moment_().add('year', +5);
        return;
    }
    ngOnInit() {
        super.ngOnInit();
        this.localDate = new Date(this.control.value);
        let time = this.localDate.toTimeString().substring(0, 5);
        this.timeFormGroup.patchValue({ dateControl: this.localDate,
            timeControl: time
        });
        return;
    }
    timeChange(event) {
        let time = event.toString();
        this.localDate.setHours(+time.substr(0, 2));
        this.localDate.setMinutes(+time.substr(3, 5));
        this.localDate.setSeconds(0);
        this.control.setValue(this.localDate);
        return;
    }
    dateChange(event) {
        let dt = new Date(this.timeFormGroup.get('dateControl').value);
        this.localDate.setHours(dt.getHours());
        this.localDate.setMinutes(dt.getMinutes());
        this.localDate.setSeconds(dt.getSeconds());
        this.control.setValue(this.localDate.toUTCString());
        return;
    }
    getDefaultValue() {
        var today = new Date();
        return (today.toString());
    }
};
tslib_1.__decorate([
    Input()
], PytDateTimePickerInputComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input()
], PytDateTimePickerInputComponent.prototype, "placeholderDate", void 0);
tslib_1.__decorate([
    Input()
], PytDateTimePickerInputComponent.prototype, "placeholderTime", void 0);
tslib_1.__decorate([
    Input()
], PytDateTimePickerInputComponent.prototype, "model", void 0);
tslib_1.__decorate([
    Input()
], PytDateTimePickerInputComponent.prototype, "purpose", void 0);
tslib_1.__decorate([
    Input()
], PytDateTimePickerInputComponent.prototype, "dateOnly", void 0);
tslib_1.__decorate([
    Output()
], PytDateTimePickerInputComponent.prototype, "dateUpdate", void 0);
PytDateTimePickerInputComponent = tslib_1.__decorate([
    Component({
        selector: 'pyt-datetimepicker-input-box',
        template: `<div class="form" [formGroup]="timeFormGroup">
    <div fxLayout="row">
        <mat-form-field color="accent" fxFlex="45">
            <input id="{{ id }}_DATE"
                matInput [matDatepicker]="datepicker"
                placeholder="{{placeholderDate}}"
               [attr.readonly]="readonly"
               [attr.readonly]="disabled"
                formControlName="dateControl"
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
        <span  fxFlex="10"></span>
        <mat-form-field color="accent" fxFlex="45">
            <input [ngxTimepicker]="timePicker"
                matInput

                [format]="24"
                placeholder="{{placeholderTime}}"
                formControlName="timeControl">
            <ngx-material-timepicker #timePicker
                (timeSet)="timeChange( $event )"
            ></ngx-material-timepicker>
            <ngx-material-timepicker-toggle matSuffix [for]="timePicker">
            </ngx-material-timepicker-toggle>
            <mat-icon matPrefix *ngIf="prefixType == 'icon'">{{ prefix }}</mat-icon>
            <mat-icon matSuffix *ngIf="suffixType == 'icon'">{{ suffix }}</mat-icon>
            <span matPrefix *ngIf="prefixType == 'text'">{{ prefix }}</span>
            <span matSuffix *ngIf="suffixType == 'text'">{{ suffix }}</span>
        </mat-form-field>
    <div>
</div>`,
        styles: ['custom-input{ width: 40%; float: left; }'],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        animations: [trigger('visibilityChanged', [
                state('true', style({ 'height': '*', 'padding-top': '4px' })),
                state('false', style({ height: '0px', 'padding-top': '0px' })),
                transition('*=>*', animate('200ms'))
            ])
        ]
    })
], PytDateTimePickerInputComponent);
export { PytDateTimePickerInputComponent };
//# sourceMappingURL=datetime.picker.component.js.map