import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ExampleHttpDatabase = class ExampleHttpDatabase {
    /** An example database that the data source uses to retrieve data for the table. */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        return;
    }
    getPage(page, size, sort = null, filterRecord) {
        const pagingRequest = {
            pageIndex: page,
            pageSize: size,
        };
        if (sort != null) {
            pagingRequest.sorting = {
                column: sort.active,
                direction: sort.direction
            };
        }
        if (filterRecord != null) {
            pagingRequest.filters = filterRecord.getFilters();
        }
        return this._httpClient.post('/api/locking/pagedlist', pagingRequest);
    }
};
ExampleHttpDatabase = tslib_1.__decorate([
    Injectable()
], ExampleHttpDatabase);
export { ExampleHttpDatabase };
//# sourceMappingURL=table-http-service.js.map