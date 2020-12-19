import { CrudDataSource } from '../../common/crud-datasource';
export class UserDataSource extends CrudDataSource {
    constructor(dataService, _paginator, _sort, _event, _backend_filter, gn_roleService) {
        super(dataService, _paginator, _sort, _event, _backend_filter);
        this.dataService = dataService;
        this.gn_roleService = gn_roleService;
        return;
    }
    sortActive(active, a, b) {
        switch (active) {
            case 'U_NAME':
                return ([a.U_NAME, b.U_NAME]);
            case 'U_FIRST_NAME':
                return ([a.U_FIRST_NAME, b.U_FIRST_NAME]);
            case 'U_LAST_NAME':
                return ([a.U_LAST_NAME, b.U_LAST_NAME]);
            case 'U_EMAIL':
                return ([a.U_EMAIL, b.U_EMAIL]);
        }
        return ([null, null]);
    }
    makeSearchString(record) {
        let searchString = '';
        searchString += record.U_NAME;
        searchString += record.U_FIRST_NAME;
        searchString += record.U_LAST_NAME;
        searchString += record.U_EMAIL;
        return (searchString.toLowerCase());
    }
}
//# sourceMappingURL=datasource.js.map