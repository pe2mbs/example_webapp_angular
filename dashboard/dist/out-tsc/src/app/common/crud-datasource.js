import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
export class CrudDataSource extends DataSource {
    constructor(_databaseTable, _paginator, _sort, pageEvent, _backend_filter) {
        super();
        this._databaseTable = _databaseTable;
        this._paginator = _paginator;
        this._sort = _sort;
        this.pageEvent = pageEvent;
        this._backend_filter = _backend_filter;
        this._filterChange = new BehaviorSubject('');
        this.filteredData = [];
        this.renderedData = [];
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
    get filterChange() {
        return (this._filterChange);
    }
    get filter() {
        return this._filterChange.value;
    }
    set filter(filter) {
        this._filterChange.next(filter);
    }
    castRecord(record) {
        return (record);
    }
    castRecords(record) {
        return (record);
    }
    makeSearchString(record) {
        return ('');
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect() {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._databaseTable.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this.pageEvent
        ];
        this._databaseTable.getAll(this._backend_filter);
        return merge(...displayDataChanges).pipe(map(() => {
            // Filter data
            this.filteredData = this.castRecords(this._databaseTable.data.slice().filter((record) => {
                const searchStr = this.makeSearchString(record);
                return (searchStr.indexOf(this.filter.toLowerCase()) !== -1);
            }));
            // Sort filtered data
            const sortedData = this.sortData(this.filteredData.slice());
            // Grab the page's slice of the filtered sorted data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return (this.renderedData);
        }));
    }
    disconnect() {
        return;
    }
    sortActive(active, a, b) {
        return ([null, null]);
    }
    /** Returns a sorted copy of the database data. */
    sortData(data) {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA = '';
            let propertyB = '';
            [propertyA, propertyB] = this.sortActive(this._sort.active, a, b);
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
    reFormat(value, pipe, format) {
        if (value === undefined || value === null || value === '') {
            return (value);
        }
        if (pipe === 'datetime') {
            let defFormat = "YYYY-MM-DD HH:mm:ss";
            const splitted = format.split(";", 2);
            if (splitted.length > 0) {
                let idx = 0;
                if (splitted[0].length === 2 || splitted[0].length === 5) {
                    moment.locale(splitted[0]);
                    idx++;
                }
                if (idx < splitted.length) {
                    defFormat = splitted[idx];
                }
            }
            value = moment(value).format(defFormat);
        }
        return (value);
    }
}
//# sourceMappingURL=crud-datasource.js.map