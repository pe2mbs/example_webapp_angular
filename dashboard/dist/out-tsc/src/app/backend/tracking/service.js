import * as tslib_1 from "tslib";
/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2021 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
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
#   gencrud: 2021-01-09 07:56:12 version 2.1.658 by user mbertens
*/
import { Injectable } from '@angular/core';
import { GcCrudServiceBase } from 'src/app/layouts/crud/crud.service.base';
let TrackingDataService = class TrackingDataService extends GcCrudServiceBase {
    constructor(httpClient) {
        super(httpClient, 'tracking');
        return;
    }
};
TrackingDataService = tslib_1.__decorate([
    Injectable()
], TrackingDataService);
export { TrackingDataService };
//# sourceMappingURL=service.js.map