import { CrudDataSource } from '../../common/crud-datasource';
export class RoleDataSource extends CrudDataSource {
    constructor(dataService, _paginator, _sort, _event, _backend_filter) {
        super(dataService, _paginator, _sort, _event, _backend_filter);
        this.dataService = dataService;
        return;
    }
    sortActive(active, a, b) {
        switch (active) {
            case 'R_ROLE':
                return ([a.R_ROLE, b.R_ROLE]);
        }
        return ([null, null]);
    }
    makeSearchString(record) {
        let searchString = '';
        searchString += record.R_ROLE;
        return (searchString.toLowerCase());
    }
}
//# sourceMappingURL=datasource.js.map