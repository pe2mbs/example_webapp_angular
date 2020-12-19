import { CrudDataSource } from '../../common/crud-datasource';
export class UserDataSource extends CrudDataSource {
    constructor(dataService, _paginator, _sort, _event, _backend_filter, roleService) {
        super(dataService, _paginator, _sort, _event, _backend_filter);
        this.dataService = dataService;
        this.roleService = roleService;
        return;
    }
    sortActive(active, a, b) {
        switch (active) {
            case 'D_USER_NAME':
                return ([a.D_USER_NAME, b.D_USER_NAME]);
            case 'D_FIRST_NAME':
                return ([a.D_FIRST_NAME, b.D_FIRST_NAME]);
            case 'D_LAST_NAME':
                return ([a.D_LAST_NAME, b.D_LAST_NAME]);
            case 'D_ENABLED':
                return ([a.D_ENABLED_LABEL, b.D_ENABLED_LABEL]);
        }
        return ([null, null]);
    }
    makeSearchString(record) {
        let searchString = '';
        searchString += record.D_USER_NAME;
        searchString += record.D_FIRST_NAME;
        searchString += record.D_LAST_NAME;
        searchString += record.D_ENABLED_LABEL;
        return (searchString.toLowerCase());
    }
}
//# sourceMappingURL=datasource.js.map