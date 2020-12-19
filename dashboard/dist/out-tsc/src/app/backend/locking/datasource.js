import { CrudDataSource } from '../../common/crud-datasource';
export class RecordLocksDataSource extends CrudDataSource {
    constructor(dataService, _paginator, _sort, _event, _backend_filter) {
        super(dataService, _paginator, _sort, _event, _backend_filter);
        this.dataService = dataService;
        return;
    }
    sortActive(active, a, b) {
        switch (active) {
            case 'L_USER':
                return ([a.L_USER, b.L_USER]);
            case 'L_TABLE':
                return ([a.L_TABLE, b.L_TABLE]);
            case 'L_START_DATE':
                return ([a.L_START_DATE, b.L_START_DATE]);
        }
        return ([null, null]);
    }
    makeSearchString(record) {
        let searchString = '';
        searchString += record.L_USER;
        searchString += record.L_TABLE;
        searchString += record.L_START_DATE;
        return (searchString.toLowerCase());
    }
}
//# sourceMappingURL=datasource.js.map