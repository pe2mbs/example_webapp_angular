BEGIN TRANSACTION;

DELETE FROM language;
DELETE FROM language_translates;
DELETE FROM language_reference;

INSERT INTO language ( LA_ID, LA_LABEL, LA_CODE2, LA_CODE3, LA_LOCALE ) VALUES ( 1, "English", "en", "eng", "en_GB" );
INSERT INTO language ( LA_ID, LA_LABEL, LA_CODE2, LA_CODE3, LA_LOCALE ) VALUES ( 2, "Nederlands", "nl", "dut", "nl_NL" );

INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 1, 'Change date time' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 1, 'Change date time', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 2, 'Action' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 2, 'Action', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 3, 'Change timestamp' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 3, 'Change timestamp', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 4, 'Start lock' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 4, 'Start lock', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 5, 'Description' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 5, 'Description', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 6, 'Last name' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 6, 'Last name', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 7, 'E-Mail address' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 7, 'E-Mail address', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 8, 'Languages' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 8, 'Languages', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 9, 'Dashboard' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 9, 'Dashboard', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 10, 'Users' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 10, 'Users', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 11, 'Roles' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 11, 'Roles', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 12, 'Record locks' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 12, 'Record locks', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 13, 'DataBase' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 13, 'DataBase', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 14, 'Demo' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 14, 'Demo', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 15, 'Conditions' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 15, 'Conditions', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 16, 'Is equal ==' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 16, 'Is equal ==', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 17, 'Is not equal !=' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 17, 'Is not equal !=', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 18, 'Greater than >' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 18, 'Greater than >', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 19, 'Between' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 19, 'Between', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 20, 'Startswith' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 20, 'Startswith', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 21, 'Not contains' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 21, 'Not contains', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 22, 'Field' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 22, 'Field', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 23, 'Clear' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 23, 'Clear', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 24, 'Demo' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 24, 'Demo', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 25, 'Less or equal than <=' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 25, 'Less or equal than <=', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 26, 'Contains' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 26, 'Contains', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 27, 'Is not empty' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 27, 'Is not empty', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 28, 'Value' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 28, 'Value', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 29, 'Search' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 29, 'Search', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 30, 'Greater or equal than >=' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 30, 'Greater or equal than >=', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 31, 'Is empty' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 31, 'Is empty', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 32, 'No results' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 32, 'No results', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 33, 'Record changes' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 33, 'Record changes', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 34, 'Administration' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 34, 'Administration', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 35, 'User' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 35, 'User', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 36, 'Table' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 36, 'Table', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 37, 'Endswith' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 37, 'Endswith', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 38, 'Less than <' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 38, 'Less than <', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 39, 'First name' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 39, 'First name', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 40, 'Username' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 40, 'Username', 1 );
INSERT INTO language_translates ( LT_ID, LT_LABEL ) values ( 41, 'Translations' );
INSERT INTO language_reference ( LR_LT_ID, TR_TEXT, LR_LA_ID ) values ( 41, 'Translations', 1 );

COMMIT;
