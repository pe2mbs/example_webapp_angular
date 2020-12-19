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
    useExisting: forwardRef(() => PytSliderInputComponent),
    multi: true
};
let PytSliderInputComponent = class PytSliderInputComponent extends PytBaseComponent {
    constructor(formGroupDir) {
        super(formGroupDir);
        this.thumbLabel = true;
        this.Init();
        return;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.Init();
        return;
    }
    Init() {
        if (this.interval === '' || this.interval === null ||
            this.interval === undefined) {
            this.interval = 1;
        }
        if (this.min === '' || this.min === null ||
            this.min === undefined) {
            this.min = 0;
        }
        if (this.max === '' || this.max === null ||
            this.max === undefined) {
            this.max = 100;
        }
        if (this.vertical === '' || this.vertical === null ||
            this.vertical === undefined) {
            this.vertical = false;
        }
        if (this.invert === '' || this.invert === null ||
            this.invert === undefined) {
            this.invert = false;
        }
        if (this.step === '' || this.step === null ||
            this.step === undefined) {
            this.step = 1;
        }
        if (this.debug) {
            console.log('this.interval', this.interval);
            console.log('this.min', this.min);
            console.log('this.max', this.max);
            console.log('this.vertical', this.vertical);
            console.log('this.disabled', this.disabled);
            console.log('this.invert', this.invert);
            console.log('this.step', this.step);
            console.log('this.thumbLabel', this.thumbLabel);
        }
        return;
    }
};
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "interval", void 0);
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "thumbLabel", void 0);
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "vertical", void 0);
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "invert", void 0);
tslib_1.__decorate([
    Input()
], PytSliderInputComponent.prototype, "step", void 0);
PytSliderInputComponent = tslib_1.__decorate([
    Component({
        selector: 'pyt-slider-input-box',
        template: `<div class="form custom-">
    {{ placeholder }}
    <mat-slider id="{{ id }}"
                class="custom-input"
                [thumbLabel]="thumbLabel"
                [vertical]="vertical"
               [attr.readonly]="readonly"
               [attr.readonly]="disabled"
                [invert]="invert"
                [step]="step"
                [tickInterval]="interval"
                [color]="color"
                [min]="min"
                [max]="max"
                [formControl]="control">
    </mat-slider>
</div><br/>`,
        styles: ['custom-input{ width: 100%; }',
            '.mat-slider-horizontal { width: 100%; }',
            '.mat-slider-vertical { height: 300px; }'],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        animations: CUSTOM_ANIMATIONS_CONTROLE
    })
], PytSliderInputComponent);
export { PytSliderInputComponent };
//# sourceMappingURL=slider.component.js.map