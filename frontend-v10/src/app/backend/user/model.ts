/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2021 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
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
#   gencrud: 2021-02-14 06:07:03 version 2.1.663 by user mbertens
*/
export class UserRecord
{
    U_ID: number;
    U_ACTIVE: boolean;
    U_NAME: string;
    U_ROLE: number;
    U_HASH_PASSWORD: string;
    U_MUST_CHANGE: boolean;
    U_FIRST_NAME: string;
    U_MIDDLE_NAME: string;
    U_LAST_NAME: string;
    U_EMAIL: string;
    U_ACCESS_TOKEN: string;
    U_REFRESH_TOKEN: string;
    U_TOKEN_DT: Date;
    U_CREATE_DT: Date;
    U_REMARK: string;
    U_LOCALE: number;
    U_LISTITEMS: number;
    U_PROFILE: string;
    U_ACTIVE_LABEL: string;
    U_ROLE_FK: any;
    U_MUST_CHANGE_LABEL: string;
    U_LOCALE_LABEL: string;
    U_LISTITEMS_LABEL: string;

}

