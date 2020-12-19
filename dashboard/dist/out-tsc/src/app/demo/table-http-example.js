import * as tslib_1 from "tslib";
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FilterRecord } from '../common/filter-header.component';
export class CardTableBase {
    constructor(dataService, displayedColumns) {
        this.dataService = dataService;
        this.pageSizeOptions = [5, 10, 25, 100];
        this.resultsLength = 0;
        this.pageIndex = 0;
        this.pageSize = 5;
        this.isLoadingResults = true;
        this.records = [];
        this.filterRecord = null;
        this.filterRecord = new FilterRecord(displayedColumns);
        this.paginatorEvent = new EventEmitter();
        this.displayedColumns = displayedColumns;
        return;
    }
    pagingEvent($event, source) {
        if (source === 'top') {
            this.bot_paginator.pageIndex = $event.pageIndex;
            this.bot_paginator.pageSize = $event.pageSize;
            this.bot_paginator.length = $event.length;
        }
        else {
            this.top_paginator.pageIndex = $event.pageIndex;
            this.top_paginator.pageSize = $event.pageSize;
            this.top_paginator.length = $event.length;
        }
        this.pageIndex = $event.pageIndex;
        this.pageSize = $event.pageSize;
        this.paginatorEvent.emit($event);
        return;
    }
    firstPage() {
        this.top_paginator.pageIndex = 0;
        this.bot_paginator.pageIndex = 0;
        return;
    }
    ngAfterViewInit() {
        this.filterRecord.event = this.paginatorEvent;
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.firstPage());
        merge(this.sort.sortChange, this.paginatorEvent)
            .pipe(startWith({}), switchMap(() => {
            this.isLoadingResults = true;
            return this.dataService.getPage(this.pageIndex, this.pageSize, this.sort, this.filterRecord);
        }), map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.resultsLength = data.recordCount;
            return (data.records);
        }), catchError(() => {
            this.isLoadingResults = false;
            return observableOf([]);
        })).subscribe(data => this.records = data);
    }
    refresh() {
        this.paginatorEvent.emit(null);
        return;
    }
}
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], CardTableBase.prototype, "top_paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], CardTableBase.prototype, "bot_paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false })
], CardTableBase.prototype, "sort", void 0);
export class RecordLocksRecord {
}
/**
 * @title Table retrieving data through HTTP
 */
let TableHttpExample = 
// tslint:disable-next-line:component-class-suffix
class TableHttpExample extends CardTableBase {
    constructor(_service) {
        super(_service, ['L_USER', 'L_START_DATE', 'L_TABLE', 'L_RECORD_ID']);
        this._service = _service;
        return;
    }
};
TableHttpExample = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'table-http-example',
        styleUrls: ['table-http-example.css',
            '../common/common-mat-card.scss'],
        templateUrl: 'table-http-example.html'
    })
    // tslint:disable-next-line:component-class-suffix
], TableHttpExample);
export { TableHttpExample };
//# sourceMappingURL=table-http-example.js.map