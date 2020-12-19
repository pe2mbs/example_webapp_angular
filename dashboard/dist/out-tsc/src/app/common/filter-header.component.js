import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { Directive, HostListener } from "@angular/core";
export const CONDITIONS_LIST = [
    { value: "EQ", label: "Is equal == ", param: 1 },
    { value: "!EQ", label: "Is not equal !=", param: 1 },
    { value: "GT", label: "Greater than >", param: 1 },
    { value: "GT|EQ", label: "Greater or equal than >=", param: 1 },
    { value: "LE", label: "Less than <", param: 1 },
    { value: "LE|EQ", label: "Less or equal than <=", param: 1 },
    { value: "BT", label: "Between", param: 2 },
    { value: "SW", label: "Startswith", param: 1 },
    { value: "EW", label: "Endswith", param: 1 },
    { value: "CO", label: "Contains", param: 1 },
    { value: "!CO", label: "Not contains", param: 1 },
    { value: "EM", label: "Is empty", param: 0 },
    { value: "!EM", label: "Is not empty", param: 0 },
];
export const CONDITION_FIELDS = {
    // Default value is 1
    "BT": 2,
    "EM": 0,
    "!EM": 0,
};
export class FilterColumn {
    constructor(column) {
        this._column = column;
        this._value = null;
        this._operator = null;
    }
    clear() {
        this._value = null;
        this._operator = null;
        return;
    }
    apply(values, operator) {
        this._value = values;
        this._operator = operator;
        return;
    }
    get column() {
        return (this._column);
    }
    get value() {
        return (this._value);
    }
    get operator() {
        return (this._operator);
    }
}
export class FilterRecord {
    constructor(columns) {
        this.event = null;
        this.filterColumns = new Array();
        // tslint:disable-next-line:forin
        for (const field in columns) {
            this.filterColumns.push(new FilterColumn(columns[field]));
        }
        return;
    }
    findItem(column) {
        let result = null;
        this.filterColumns.forEach(field => {
            if (field.column === column) {
                result = field;
                return;
            }
        });
        return (result);
    }
    clear(column) {
        const col = this.findItem(column);
        if (col != null) {
            col.clear();
        }
        return;
    }
    apply(column, values, operator) {
        const col = this.findItem(column);
        if (col != null) {
            col.apply(values, operator);
        }
        return;
    }
    getFilters() {
        const columns = new Array();
        this.filterColumns.forEach(field => {
            if (field.value != null || field.operator != null) {
                columns.push({ column: field.column,
                    value: field.value,
                    operator: field.operator });
                return;
            }
        });
        return (columns);
    }
}
let FilterItemDirective = class FilterItemDirective {
    onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
};
tslib_1.__decorate([
    HostListener("click", ["$event"])
], FilterItemDirective.prototype, "onClick", null);
FilterItemDirective = tslib_1.__decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: "[mat-filter-item]"
    })
], FilterItemDirective);
export { FilterItemDirective };
let FilterHeaderComponent = class FilterHeaderComponent {
    constructor() {
        this.conditionsList = CONDITIONS_LIST;
        this.value = new Array(2);
        this.caption = ['Value', 'Max. value'];
        this.fields = 1;
        this.applyFilter = new EventEmitter();
        return;
    }
    selectEvent($event) {
        this.fields = 1;
        this.caption[0] = 'Value';
        if (this.conditionPosition != null) {
            if (this.conditionPosition in CONDITION_FIELDS) {
                this.fields = CONDITION_FIELDS[this.conditionPosition];
                if (this.fields === 2) {
                    this.caption[0] = 'Min. Value';
                }
            }
        }
        return;
    }
    clearColumnFilter() {
        this.value = [null, null];
        this.conditionPosition = null;
        this.filterRecord.clear(this.field);
        return;
    }
    applyColumnFilter() {
        this.filterRecord.apply(this.field, this.value, this.conditionPosition);
        this.applyFilter.emit(this.filterRecord);
        if (this.filterRecord.event != null) {
            this.filterRecord.event.emit();
        }
        return;
    }
};
tslib_1.__decorate([
    Input()
], FilterHeaderComponent.prototype, "title", void 0);
tslib_1.__decorate([
    Input()
], FilterHeaderComponent.prototype, "field", void 0);
tslib_1.__decorate([
    Input()
], FilterHeaderComponent.prototype, "filterRecord", void 0);
tslib_1.__decorate([
    Output()
], FilterHeaderComponent.prototype, "applyFilter", void 0);
FilterHeaderComponent = tslib_1.__decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        // tslint:disable-next-line:component-selector
        selector: 'filter-header',
        template: `<div class="header" click-stop-propagation>
	{{ title }}
	<button mat-icon-button class="btn-toggle" [matMenuTriggerFor]="menu">
		<mat-icon>keyboard_arrow_down</mat-icon>
	</button>
</div>
<mat-menu #menu>
	<div mat-menu-item mat-filter-item [disableRipple]="true" class="menu-title">
		<div fxLayout="row">
			<div fxFlex>Field</div>
			<div fxFlex fxLayoutAlign="end">{{ title }}</div>
		</div>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true">
		<mat-form-field>
			<mat-select [panelClass]="'mat-elevation-z10'" 
						placeholder='Conditions' 
						(selectionChange)="selectEvent( $event )"
						[(value)]="conditionPosition">
				<mat-option *ngFor="let condition of conditionsList" [value]="condition.value" class="cond_option">
					{{ condition.label }}
				</mat-option>
			</mat-select>
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields > 0">
		<mat-form-field>
			<input matInput [placeholder]="caption[0]" [(ngModel)]="value[0]">
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields === 2">
		<mat-form-field>
			<input matInput [placeholder]="caption[0]" [(ngModel)]="value[1]">
		</mat-form-field>
	</div>
	<div mat-menu-item [disableRipple]="true">
		<div fxLayout="row">
			<button mat-raised-button fxFlex class="action-button" (click)="clearColumnFilter()">Clear</button>
			<button mat-raised-button color="primary" fxFlex class="action-button" (click)="applyColumnFilter()">Search</button>
		</div>
	</div>
</mat-menu>`,
        styles: [`.cond_option { font-size: inherit; line-height: 1.5em!important; height: 1.5em!important; }`,
            '.action-button { width: 50px; margin-left: 5px; margin-right: 5px;  }'
        ]
    })
], FilterHeaderComponent);
export { FilterHeaderComponent };
//# sourceMappingURL=filter-header.component.js.map