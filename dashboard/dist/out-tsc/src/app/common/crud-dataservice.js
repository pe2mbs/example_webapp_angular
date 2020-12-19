/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2020 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
#
#   This library is free software; you can redistribute it and/or modify
#   it under the terms of the GNU Library General Public License GPL-2.0-only
#   as published by the Free Software Foundation.
#
#   This library is distributed in the hope that it will be useful, but
#   WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#   Library General Public License for more details.
#
#   You should have received a copy of the GNU Library General Public
#   License GPL-2.0-only along with this library; if not, write to the
#   Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
#   Boston, MA 02110-1301 USA
#
*/
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
export class BackendError extends Error {
    constructor(message, backend_info) {
        const trueProto = new.target.prototype;
        super(message);
        Object.setPrototypeOf(this, trueProto);
        this.code = backend_info.code;
        this.backend = backend_info.message;
        this.trace = backend_info.traceback;
        this.url = backend_info.url;
        this.backendInfo = backend_info;
    }
}
export class CrudDataService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.debug = false;
        this._backend_filter = null;
        this.dataChange = new BehaviorSubject([]);
        return;
    }
    get uri() {
        return this._uri;
    }
    set uri(value) {
        this._uri = value;
        return;
    }
    get data() {
        return this.dataChange.value;
    }
    getDialogData() {
        return this.dialogData;
    }
    /** CRUD METHODS */
    getAll(_backend_filter) {
        let uri = '/list';
        if (_backend_filter !== null) {
            this._backend_filter = _backend_filter;
            uri += '/' + _backend_filter.id + '/' + _backend_filter.value;
        }
        this.httpClient.get(this._uri + uri).subscribe(data => {
            this.dataChange.next(data);
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    getPagedList(page, pageSize, columns, columnSort = null) {
        this.pagedList(page, pageSize, columns, columnSort).subscribe(data => {
            console.log("pagedList", data);
            this.dataChange.next(data.records);
            this._pageIndex = data.page;
            this._pageSize = data.pageSize;
            this._recordCount = data.recordCount;
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    pagedList(page, pageSize, columns, columnSort = null) {
        const params = {
            page,
            pageSize,
            columns,
            columnSort
        };
        return this.httpClient.post(this._uri + '/pagedlist', params);
    }
    list(_backend_filter) {
        let uri = '/list';
        if (_backend_filter !== null) {
            this._backend_filter = _backend_filter;
            uri += '/' + _backend_filter.id + '/' + _backend_filter.value;
        }
        return this.httpClient.get(this._uri + uri);
    }
    getSelectListSimple(value, label, initial = null, final = null) {
        const listParams = new HttpParams().set('label', label).set('value', value);
        if (initial != null) {
            listParams.set('initial', initial);
        }
        if (final != null) {
            listParams.set('final', final);
        }
        return this.httpClient.get(this._uri + '/select', { params: listParams });
    }
    getSelectList(value, label, initial = null, final = null) {
        const listParams = new HttpParams().set('label', label).set('value', value);
        if (initial != null) {
            listParams.set('initial', initial);
        }
        if (final != null) {
            listParams.set('final', final);
        }
        return (Observable.create(observer => {
            this.httpClient.get(this._uri + '/select', { params: listParams })
                .subscribe((data) => {
                if (this.debug) {
                    console.log('getSelectList() => ', data);
                }
                observer.next(data);
                observer.complete();
            }, (error) => {
                throw new BackendError(error.message, error.error);
            });
        }));
    }
    getSelectionList(value, label, initial = null, final = null) {
        const listParams = new HttpParams().set('label', label).set('value', value);
        if (initial != null) {
            listParams.set('initial', initial);
        }
        if (final != null) {
            listParams.set('final', final);
        }
        return (Observable.create(observer => {
            this.httpClient.get(this._uri + '/select', { params: listParams })
                .subscribe((data) => {
                if (this.debug) {
                    console.log('getSelectList() => ', data);
                }
                const result = new Array();
                result.push('-');
                data = data.sort((n1, n2) => {
                    if (n1.value > n2.value) {
                        return 1;
                    }
                    else if (n1.value < n2.value) {
                        return -1;
                    }
                    return 0;
                });
                for (const entry of data) {
                    result.push(entry.label);
                }
                observer.next(result);
                observer.complete();
            }, (error) => {
                throw new BackendError(error.message, error.error);
            });
        }));
    }
    lockRecord(record) {
        this.dialogData = record;
        this.httpClient.post(this._uri + '/lock', record).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    unlockRecord(record) {
        this.dialogData = null;
        this.httpClient.post(this._uri + '/unlock', record).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    addRecord(record) {
        if (this.debug) {
            console.log('addRecord', record);
        }
        this.dialogData = record;
        this.httpClient.post(this._uri + '/new', record).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
            this.getAll(this._backend_filter);
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    getRecordById(id) {
        if (this.debug) {
            console.log('getRecordById', id);
        }
        return this.httpClient.get(this._uri + '/get/' + id);
    }
    getRecord(record) {
        if (this.debug) {
            console.log('getRecord', record);
        }
        this.dialogData = record;
        this.httpClient.get(this._uri + '/get', record).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    updateRecord(record) {
        if (this.debug) {
            console.log('updateRecord.orignal ', this.dialogData);
            console.log('updateRecord.updated ', record);
        }
        for (const key of Object.keys(record)) {
            if (this.debug) {
                console.log('update key ' + key + ' with value ', record[key]);
            }
            this.dialogData[key] = record[key];
        }
        this.httpClient.post(this._uri + '/update', this.dialogData).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
            this.getAll(this._backend_filter);
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    deleteRecord(record) {
        console.log('deleteRecord', record);
        this.httpClient.delete(this._uri + '/' + record).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
            this.getAll(this._backend_filter);
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    genericPut(uri, params) {
        console.log('genericPut', uri, params);
        this.httpClient.put(this._uri + uri, params).subscribe(result => {
            if (this.debug) {
                console.log(result);
            }
        }, (error) => {
            throw new BackendError(error.message, error.error);
        });
        return;
    }
    genericGet(uri, params) {
        console.log('genericGet', uri, params);
        return this.httpClient.get(this._uri + uri, params);
    }
    genericPost(uri, body, options) {
        console.log('genericPost', this._uri + uri, body, options);
        return this.httpClient.post(this._uri + uri, body);
    }
    downloadFile(filename, reqParams) {
        const options = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });
        return this.httpClient.get(this._uri + '/' + filename, { headers: options,
            params: reqParams,
            responseType: 'blob' }).pipe(tap(data => {
            console.log('You received data');
        }, error => {
            console.log(error);
            throw new BackendError(error.message, error.error);
        }));
    }
}
//# sourceMappingURL=crud-dataservice.js.map