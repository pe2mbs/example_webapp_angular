import { GcFilterColumnReq } from '../../layouts/filter-header.component';

export interface GcCrudPageInfo
{
	pageIndex: number;
	pageSize: number;
	pageSizeOptions: number[];
	filters: GcFilterColumnReq[];
}

export interface GcPagingData
{
	pageIndex: number;
	pageSize: number;
	recordCount: number;
	records: any[];
}

export interface GcSortingRequest
{
	column: string;
	direction?: string; 
}

export interface GcPagingRequest
{
	pageIndex: number;
	pageSize: number;
	sorting?: GcSortingRequest;
	filters?: GcFilterColumnReq[];
}

export interface GcBackEndInfo
{
    code: number;
    name: string;
    message: string;
    url: string;
    traceback: any;
    request: any;
}

export interface GcFilterColumn
{
    column: string;
}

export interface GcBackendColumnSort
{
    column: string;
}

export interface GcFilteredListReq
{
    page: number;
    pageSize: number;
    columns?: GcFilterColumn[];
    columnSort?: GcBackendColumnSort;
}

export interface GcFilteredList<T>
{
    page: number;
    pageSize: number;
    recordCount: number;
    records: T;
}

export interface GcSelectList
{
    value: any;
    label: string;
}
