PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

INSERT INTO gn_role VALUES(1,'Administrator','Application administrator');
INSERT INTO gn_role VALUES(2,'Test engineer','');
INSERT INTO gn_role VALUES(3,'Tester','');

INSERT INTO news VALUES(1,1,1,1,'Hello world','2020-12-20','2020-12-20');
INSERT INTO news VALUES(2,1,1,1,'Hello world','2020-12-20',NULL);

INSERT INTO gn_user VALUES(1,1,'testing',1,'testing',0,'test','','testing','test@example.com',NULL,NULL,NULL,NULL,'{"theme": "equensworldline-theme", "objects": {"DemoTable": {"filters": [], "pageIndex": 0, "pageSize": 5, "pageSizeOptions": [5, 10, 25, 100]}, "RecordLocksTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}, "RoleTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}, "TrackingTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}, "UserTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}}}',1,25);
INSERT INTO gn_user VALUES(2,1,'testuser',1,'testuser1@A',0,'test','','hello','test@example.com',NULL,NULL,NULL,NULL,NULL,1,25);
COMMIT;
