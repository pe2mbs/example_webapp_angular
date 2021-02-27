begin transaction;
delete from MOD_ACCESS;
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "*", "All modules" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "user", "Users" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "role", "Roles" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "languages", "Languages" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "language_translates", "Translations" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "locking", "Locking" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "news", "News" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "tracking", "Tracking" );
insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "role_access", "Role access" );
-- insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "", "" );
-- insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "", "" );
-- insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "", "" );
-- insert into MOD_ACCESS ( MA_MODULE, MA_DESCRIPTION ) values ( "", "" );
commit transaction;
.headers on
.mode column
select * from MOD_ACCESS;