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
#   gencrud: 2020-11-29 07:57:50 version 2.0.607 by user mbertens
*/
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRecord } from './model';
import { ScreenBaseComponent } from 'src/app/common/crud-screen-component';
let ScreenUserComponent = class ScreenUserComponent extends ScreenBaseComponent {
    constructor(route, router, dataService, roleService) {
        super();
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.roleService = roleService;
        this.hide_D_PASSWORD = true;
        this.D_ENABLEDList = [
            {
                "label": "Disabled",
                "value": false
            },
            {
                "label": "Enabled",
                "value": true
            }
        ];
        this.row = new UserRecord();
        this.formGroup = new FormGroup({
            D_USER_NAME: new FormControl(this.row.D_USER_NAME || '', [Validators.required, Validators.maxLength(20),]),
            D_PASSWORD: new FormControl(this.row.D_PASSWORD || '', [Validators.required, Validators.maxLength(64),]),
            D_FIRST_NAME: new FormControl(this.row.D_FIRST_NAME || '', [Validators.required, Validators.maxLength(30),]),
            D_MIDDLE_NAME: new FormControl(this.row.D_MIDDLE_NAME || '', [Validators.maxLength(30),]),
            D_LAST_NAME: new FormControl(this.row.D_LAST_NAME || '', [Validators.required, Validators.maxLength(30),]),
            D_LAST_CHANGED: new FormControl(this.row.D_LAST_CHANGED || '', [Validators.required,]),
            D_ROLE_ID: new FormControl(this.row.D_ROLE_ID || 0, []),
            D_ENABLED: new FormControl(this.row.D_ENABLED || false, []),
            D_SLIDER: new FormControl(this.row.D_SLIDER || 0, []),
            D_ROLE_COMMENT: new FormControl(this.row.D_ROLE_COMMENT || '', []),
        });
        return;
    }
    ngOnInit() {
        if (this.id === undefined || this.id === null) {
            this.registerSubscription(this.route.queryParams.subscribe(params => {
                console.log(params);
                this.id = params.id; // Contains the key field, currently only the primary key is supported.
                this.value = params.value; // Contains val value for the key field.
                this.mode = params.mode; // edit or new, filter only supported on the table component.
                this.updateFixedValues(params);
            }));
        }
        if (this.value != null || this.value != undefined) {
            this.registerSubscription(this.dataService.getRecordById(this.value).subscribe(record => {
                this.row = record;
                this.formGroup.patchValue({
                    D_USER_ID: this.row.D_USER_ID,
                    D_USER_NAME: this.row.D_USER_NAME,
                    D_PASSWORD: this.row.D_PASSWORD,
                    D_FIRST_NAME: this.row.D_FIRST_NAME,
                    D_MIDDLE_NAME: this.row.D_MIDDLE_NAME,
                    D_LAST_NAME: this.row.D_LAST_NAME,
                    D_LAST_CHANGED: this.row.D_LAST_CHANGED,
                    D_ROLE_ID: this.row.D_ROLE_ID,
                    D_ENABLED: this.row.D_ENABLED,
                    D_SLIDER: this.row.D_SLIDER,
                    D_ROLE_COMMENT: this.row.D_ROLE_COMMENT,
                });
                this.updateFixedValues();
                this.dataService.lockRecord(this.row);
            }));
        }
        this.registerSubscription(this.roleService.getSelectList('D_ROLE_ID', 'D_ROLE_NAME').subscribe(dataList => {
            this.roleList = dataList;
        }));
        return;
    }
    get D_USER_ID() {
        return (this.formGroup.get('D_USER_ID'));
    }
    get D_USER_NAME() {
        return (this.formGroup.get('D_USER_NAME'));
    }
    get D_PASSWORD() {
        return (this.formGroup.get('D_PASSWORD'));
    }
    get D_FIRST_NAME() {
        return (this.formGroup.get('D_FIRST_NAME'));
    }
    get D_MIDDLE_NAME() {
        return (this.formGroup.get('D_MIDDLE_NAME'));
    }
    get D_LAST_NAME() {
        return (this.formGroup.get('D_LAST_NAME'));
    }
    get D_LAST_CHANGED() {
        return (this.formGroup.get('D_LAST_CHANGED'));
    }
    get D_ROLE_ID() {
        return (this.formGroup.get('D_ROLE_ID'));
    }
    get D_ENABLED() {
        return (this.formGroup.get('D_ENABLED'));
    }
    get D_SLIDER() {
        return (this.formGroup.get('D_SLIDER'));
    }
    get D_ROLE_COMMENT() {
        return (this.formGroup.get('D_ROLE_COMMENT'));
    }
};
ScreenUserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-screen',
        templateUrl: './screen.component.html'
    })
], ScreenUserComponent);
export { ScreenUserComponent };
//# sourceMappingURL=screen.component.js.map