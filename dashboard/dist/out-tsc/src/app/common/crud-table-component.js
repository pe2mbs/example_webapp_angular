import * as tslib_1 from "tslib";
import { Subscribers } from './subscribers';
import { MatSort } from '@angular/material';
import { ViewChild, EventEmitter, Input } from '@angular/core';
export class TableBaseComponent extends Subscribers {
    constructor(componentName, addDialogComponent, delDialogComponent, route, dialog, dataService) {
        super();
        this.componentName = componentName;
        this.addDialogComponent = addDialogComponent;
        this.delDialogComponent = delDialogComponent;
        this.route = route;
        this.dialog = dialog;
        this.dataService = dataService;
        this.backendFilter = null;
        this.pageSize = 10;
        this.pageIndex = 0;
        this.paginatorEvent = new EventEmitter();
        return;
    }
    applyFilter(dummy) {
        return;
    }
    ngOnInit() {
        let tmp = localStorage.getItem(this.componentName + '.size');
        if (tmp !== null) {
            this.pageSize = +tmp;
        }
        if (this.id !== undefined && this.id !== null) {
            this.backendFilter = { id: this.id, value: this.value };
            this.mode = 'filter';
        }
        else {
            this.mode = 'view';
            this.registerSubscription(this.route.queryParams.subscribe(params => {
                // console.log( params );
                if (params.id !== undefined && params.id !== null) {
                    this.backendFilter = {
                        id: params.id,
                        value: params.value // Contains val value for the key field.
                    };
                    this.mode = params.mode; // filter, edit or new only supported on the screen component
                }
            }));
        }
        console.log('ngOnInit: mode', this.mode);
        // console.log( 'ngOnInit: backendFilter', this.backendFilter );
        this.loadData();
        tmp = localStorage.getItem(this.componentName + '.index');
        if (tmp !== null) {
            this.bot_paginator.pageIndex = +tmp;
        }
        return;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        return;
    }
    addRecord() {
        const nRecord = this.newRecord();
        console.log('addNew ', nRecord);
        const dialogRef = this.dialog.open(this.addDialogComponent, {
            data: { record: nRecord,
                mode: 'add' },
        });
        const height = (6 * 72) + 130;
        dialogRef.afterClosed().subscribe(result => {
            console.log('addNew() dialog result ', result);
            if (result === 1) {
                // After dialog is closed we're doing frontend updates
                this.refreshTable();
            }
        });
        dialogRef.updateSize('85%', height.toString() + 'px');
        return;
    }
    refresh() {
        this.dataSource.connect();
        return;
    }
    editRecord(foundIndex, edit_record) {
        this.dataService.lockRecord(edit_record);
        const height = (6 * 72) + 190;
        const dialogRef = this.dialog.open(this.addDialogComponent, {
            data: { record: edit_record,
                mode: 'edit' },
        });
        dialogRef.updateSize('85%', height.toString() + 'px');
        dialogRef.afterClosed().subscribe(result => {
            console.log('editRecord() dialog result ', result);
            if (result === 1) {
                // When using an edit things are little different,
                // firstly we find record inside DataService by id
                console.log('editRecord() updating index ', foundIndex);
                // Then you update that record using data from
                // dialogData (values you entered)
                this.dataService.dataChange.value[foundIndex] = this.dataService.getDialogData();
                // And lastly refresh table
                this.refreshTable();
            }
            else {
                this.dataService.unlockRecord(edit_record);
            }
        });
        return;
    }
    pagingEvent($event) {
        this.pageSize = $event.pageSize;
        localStorage.setItem(this.componentName + '.size', $event.pageSize);
        localStorage.setItem(this.componentName + '.index', $event.pageIndex);
        this.bot_paginator.length = $event.length;
        this.bot_paginator.pageSize = $event.pageSize;
        this.bot_paginator.pageIndex = $event.pageIndex;
        this.top_paginator.length = $event.length;
        this.top_paginator.pageSize = $event.pageSize;
        this.top_paginator.pageIndex = $event.pageIndex;
        this.paginatorEvent.emit($event);
        return ($event);
    }
    refreshTable() {
        this.bot_paginator._changePageSize(this.bot_paginator.pageSize);
        return;
    }
    deleteRecord(i, delete_record, field_name = null, id = null) {
        this.id = id;
        this.lockRecord(delete_record);
        console.log('deleteRecord() ', delete_record);
        const dialogRef = this.dialog.open(this.delDialogComponent, {
            data: { record: delete_record,
                label: delete_record[field_name] || null,
                mode: 'delete' }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('deleteItem() dialog result ', result);
            if (result === 1) {
                const foundIndex = this.dataService.dataChange.value.findIndex(x => x[0] === this.id);
                console.log('deleteItem() removing index ', foundIndex);
                this.dataService.dataChange.value.splice(foundIndex, 0);
                this.refreshTable();
            }
            else {
                this.unlockRecord(delete_record);
            }
        });
        return;
    }
    newRecord() { }
    lockRecord(record) { }
    unlockRecord(record) { }
    loadData() { }
    setFilter(filter) { }
}
tslib_1.__decorate([
    Input()
], TableBaseComponent.prototype, "id", void 0);
tslib_1.__decorate([
    Input()
], TableBaseComponent.prototype, "value", void 0);
tslib_1.__decorate([
    ViewChild('bot_paginator', { static: true })
], TableBaseComponent.prototype, "bot_paginator", void 0);
tslib_1.__decorate([
    ViewChild('top_paginator', { static: true })
], TableBaseComponent.prototype, "top_paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], TableBaseComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild('filter', { static: true })
], TableBaseComponent.prototype, "filter", void 0);
//# sourceMappingURL=crud-table-component.js.map