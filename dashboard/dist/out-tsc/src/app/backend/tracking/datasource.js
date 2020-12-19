import { CrudDataSource } from '../../common/crud-datasource';
export class TrackingDataSource extends CrudDataSource {
    constructor(dataService, _paginator, _sort, _event, _backend_filter) {
        super(dataService, _paginator, _sort, _event, _backend_filter);
        this.dataService = dataService;
        return;
    }
    sortActive(active, a, b) {
        switch (active) {
            case 'T_USER':
                return ([a.T_USER, b.T_USER]);
            case 'T_TABLE':
                return ([a.T_TABLE, b.T_TABLE]);
            case 'T_ACTION':
                return ([a.T_ACTION_LABEL, b.T_ACTION_LABEL]);
            case 'T_CHANGE_DATE_TIME':
                return ([a.T_CHANGE_DATE_TIME, b.T_CHANGE_DATE_TIME]);
        }
        return ([null, null]);
    }
    makeSearchString(record) {
        let searchString = '';
        searchString += record.T_USER;
        searchString += record.T_TABLE;
        searchString += record.T_ACTION_LABEL;
        searchString += record.T_CHANGE_DATE_TIME;
        return (searchString.toLowerCase());
    }
}
//# sourceMappingURL=datasource.js.map