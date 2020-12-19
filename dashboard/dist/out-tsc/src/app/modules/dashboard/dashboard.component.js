var DashboardComponent_1;
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { GridType, CompactType, DisplayGrid } from 'angular-gridster2';
let DashboardComponent = DashboardComponent_1 = class DashboardComponent {
    constructor() {
        return;
    }
    static itemChange(item, itemComponent) {
        console.log('itemChanged', item, itemComponent);
    }
    static itemResize(item, itemComponent) {
        console.log('itemResized', item, itemComponent);
    }
    ngOnInit() {
        this.options = {
            gridType: GridType.Fit,
            compactType: CompactType.None,
            displayGrid: DisplayGrid.Always,
            minCols: 1,
            maxCols: 10,
            minRows: 1,
            maxRows: 10,
            maxItemCols: 10,
            minItemCols: 1,
            maxItemRows: 10,
            minItemRows: 1,
            pushItems: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true
            },
            itemChangeCallback: DashboardComponent_1.itemChange,
            itemResizeCallback: DashboardComponent_1.itemResize,
        };
        this.dashboard = [
            { cols: 5, rows: 4, y: 0, x: 0, initCallback: this.initItem.bind(this) },
            { cols: 5, rows: 1, y: 0, x: 2 },
            { cols: 2, rows: 1, y: 0, x: 2 },
            { cols: 1, rows: 1, y: 0, x: 2 },
            { cols: 3, rows: 1, y: 0, x: 2 },
        ];
        return;
    }
    initItem(item, itemComponent) {
        this.itemToPush = itemComponent;
    }
    changedOptions() {
        this.options.api.optionsChanged();
        return;
    }
    removeItem(item) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
        return;
    }
    addItem() {
        // this.dashboard.push( {} );
        return;
    }
};
DashboardComponent = DashboardComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map