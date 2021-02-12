PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

INSERT INTO gn_role VALUES(1,'Administrator','Application administrator');
INSERT INTO gn_role VALUES(2,'Test engineer','');
INSERT INTO gn_role VALUES(3,'Tester','');

INSERT INTO locking VALUES(1,'single.user','gn_user',1,'2020-12-15 20:49:33.276996');
INSERT INTO locking VALUES(2,'single.user','gn_user',1,'2020-12-15 20:49:37.945666');
INSERT INTO locking VALUES(3,'single.user','gn_user',1,'2020-12-15 20:49:40.301055');
INSERT INTO locking VALUES(4,'single.user','gn_user',1,'2020-12-16 04:39:32.348872');
INSERT INTO locking VALUES(5,'single.user','gn_role',1,'2020-12-16 04:40:08.028595');
INSERT INTO locking VALUES(6,'single.user','gn_user',1,'2020-12-16 04:40:13.262301');
INSERT INTO locking VALUES(7,'single.user','gn_user',1,'2020-12-16 04:41:53.694401');
INSERT INTO locking VALUES(8,'single.user','gn_user',1,'2020-12-16 04:42:21.538253');
INSERT INTO locking VALUES(9,'single.user','gn_user',1,'2020-12-18 09:00:28.951566');
INSERT INTO locking VALUES(10,'single.user','gn_user',1,'2020-12-29 05:22:00.415813');
INSERT INTO locking VALUES(11,'single.user','gn_user',1,'2020-12-29 05:35:21.253766');
INSERT INTO locking VALUES(12,'single.user','gn_user',1,'2020-12-29 05:38:11.900890');
INSERT INTO locking VALUES(13,'single.user','gn_user',1,'2020-12-29 05:39:13.542537');
INSERT INTO locking VALUES(14,'single.user','gn_user',1,'2020-12-29 05:48:40.675599');
INSERT INTO locking VALUES(15,'single.user','gn_user',1,'2020-12-29 05:49:11.118894');
INSERT INTO locking VALUES(16,'single.user','gn_user',1,'2020-12-29 05:50:54.464036');
INSERT INTO locking VALUES(17,'single.user','gn_user',1,'2020-12-29 05:51:51.595605');
INSERT INTO locking VALUES(18,'single.user','gn_user',1,'2020-12-29 05:53:03.552895');
INSERT INTO locking VALUES(19,'single.user','gn_user',1,'2020-12-29 05:53:45.223983');
INSERT INTO locking VALUES(20,'single.user','gn_role',1,'2020-12-29 06:18:18.746848');
INSERT INTO locking VALUES(21,'single.user','gn_role',1,'2020-12-29 06:21:27.270069');
INSERT INTO locking VALUES(22,'single.user','gn_role',1,'2020-12-29 06:22:48.816455');
INSERT INTO locking VALUES(23,'single.user','gn_role',1,'2020-12-29 06:23:39.858182');
INSERT INTO locking VALUES(24,'single.user','gn_user',1,'2020-12-29 06:35:08.524585');
INSERT INTO locking VALUES(25,'single.user','gn_user',1,'2020-12-29 06:35:31.034838');
INSERT INTO locking VALUES(26,'single.user','gn_user',1,'2020-12-29 07:41:57.886255');
INSERT INTO locking VALUES(27,'single.user','gn_user',1,'2020-12-29 07:45:28.643345');
INSERT INTO locking VALUES(28,'single.user','gn_user',1,'2020-12-29 07:52:58.704088');
INSERT INTO locking VALUES(29,'single.user','gn_user',1,'2020-12-29 07:54:54.740309');
INSERT INTO locking VALUES(30,'single.user','gn_user',1,'2020-12-29 07:55:23.951002');
INSERT INTO locking VALUES(31,'single.user','gn_user',1,'2020-12-29 11:42:20.101776');
INSERT INTO locking VALUES(32,'single.user','user',1,'2020-12-30 20:50:22.587356');
INSERT INTO locking VALUES(33,'single.user','tracking',16,'2020-12-30 21:04:34.703207');
INSERT INTO locking VALUES(34,'single.user','tracking',16,'2020-12-30 21:06:52.316467');
INSERT INTO locking VALUES(35,'single.user','tracking',10,'2021-01-01 08:51:53.690578');
INSERT INTO locking VALUES(36,'single.user','tracking',1,'2021-01-01 09:09:38.214425');
INSERT INTO locking VALUES(37,'single.user','tracking',1,'2021-01-01 09:11:15.899859');
INSERT INTO locking VALUES(38,'single.user','tracking',1,'2021-01-01 09:12:02.033149');
INSERT INTO locking VALUES(39,'single.user','tracking',1,'2021-01-01 09:12:59.295926');
INSERT INTO locking VALUES(40,'single.user','tracking',1,'2021-01-01 09:14:21.104561');
INSERT INTO locking VALUES(41,'single.user','tracking',1,'2021-01-01 09:15:51.177372');
INSERT INTO locking VALUES(42,'single.user','tracking',1,'2021-01-01 09:16:50.196907');
INSERT INTO locking VALUES(43,'single.user','tracking',1,'2021-01-01 09:17:35.627510');
INSERT INTO locking VALUES(44,'single.user','tracking',1,'2021-01-01 09:18:46.576892');
INSERT INTO locking VALUES(45,'single.user','tracking',1,'2021-01-01 09:19:37.192578');
INSERT INTO locking VALUES(46,'single.user','tracking',1,'2021-01-01 09:19:53.809763');
INSERT INTO locking VALUES(47,'single.user','tracking',1,'2021-01-01 09:20:32.696952');
INSERT INTO locking VALUES(48,'single.user','tracking',1,'2021-01-01 09:23:01.725666');
INSERT INTO locking VALUES(49,'single.user','tracking',1,'2021-01-01 09:23:34.702870');
INSERT INTO locking VALUES(50,'single.user','tracking',10,'2021-01-01 09:24:01.717010');
INSERT INTO locking VALUES(51,'single.user','tracking',1,'2021-01-01 09:26:00.712079');
INSERT INTO locking VALUES(52,'single.user','tracking',2,'2021-01-01 09:26:10.525350');
INSERT INTO locking VALUES(53,'single.user','tracking',1,'2021-01-01 09:27:11.644605');
INSERT INTO locking VALUES(54,'single.user','tracking',1,'2021-01-01 09:27:18.037063');
INSERT INTO locking VALUES(55,'single.user','tracking',2,'2021-01-01 16:39:17.546929');
INSERT INTO locking VALUES(56,'single.user','tracking',2,'2021-01-01 16:44:33.737005');
INSERT INTO locking VALUES(57,'single.user','tracking',2,'2021-01-01 16:45:48.284811');
INSERT INTO locking VALUES(58,'single.user','tracking',2,'2021-01-01 16:46:35.216479');
INSERT INTO locking VALUES(59,'single.user','tracking',2,'2021-01-01 16:47:13.260798');
INSERT INTO locking VALUES(60,'single.user','tracking',2,'2021-01-01 16:47:39.411901');
INSERT INTO locking VALUES(61,'single.user','tracking',2,'2021-01-01 16:49:24.833200');
INSERT INTO locking VALUES(62,'single.user','tracking',2,'2021-01-01 16:50:18.712165');
INSERT INTO locking VALUES(63,'single.user','tracking',2,'2021-01-01 16:51:17.716640');
INSERT INTO locking VALUES(64,'single.user','tracking',2,'2021-01-01 16:59:21.188112');
INSERT INTO locking VALUES(65,'single.user','tracking',2,'2021-01-01 16:59:26.827633');
INSERT INTO locking VALUES(66,'single.user','tracking',2,'2021-01-01 16:59:37.331702');
INSERT INTO locking VALUES(67,'single.user','tracking',2,'2021-01-01 17:00:26.543047');
INSERT INTO locking VALUES(68,'single.user','tracking',2,'2021-01-01 17:00:53.421784');
INSERT INTO locking VALUES(69,'single.user','tracking',2,'2021-01-01 17:01:51.234664');

INSERT INTO news VALUES(1,1,1,1,'Hello world','2020-12-20','2020-12-20');
INSERT INTO news VALUES(2,1,1,1,'Hello world','2020-12-20',NULL);

INSERT INTO tracking VALUES(2,'single.user','gn_role',3,3,'2020-12-14 04:55:06.155922','{"R_ID": 3, "R_ROLE": "Tester", "R_REMARK": ""}');
INSERT INTO tracking VALUES(3,'single.user','gn_role',3,4,'2020-12-14 04:55:09.301887','{"R_ID": 4, "R_ROLE": "Test lead", "R_REMARK": ""}');
INSERT INTO tracking VALUES(4,'single.user','gn_role',3,5,'2020-12-14 04:55:11.281039','{"R_ID": 5, "R_ROLE": "Test Manager", "R_REMARK": ""}');
INSERT INTO tracking VALUES(5,'single.user','gn_role',3,6,'2020-12-14 04:55:13.369207','{"R_ID": 6, "R_ROLE": "Test Automation engineer", "R_REMARK": ""}');
INSERT INTO tracking VALUES(6,'single.user','gn_role',1,3,'2020-12-14 04:56:44.337281','{"R_ID": 3, "R_ROLE": "Tester", "R_REMARK": ""}');
INSERT INTO tracking VALUES(7,'single.user','gn_user',1,1,'2020-12-14 05:08:38.793729','{"U_ID": 1, "U_ACTIVE": true, "U_NAME": "mbertens", "U_ROLE": 1, "U_HASH_PASSWORD": "5701mb", "U_MUST_CHANGE": false, "U_FIRST_NAME": "Marc", "U_MIDDLE_NAME": "", "U_LAST_NAME": "Bertens-Nguyen", "U_EMAIL": "m.bertens@pe2mbs.nl", "U_ACCESS_TOKEN": null, "U_REFRESH_TOKEN": null, "U_TOKEN_DT": null, "U_CREATE_DT": null, "U_REMARK": "", "U_LOCALE": 1, "U_LISTITEMS": 25}');
INSERT INTO tracking VALUES(8,'single.user','locking',3,1,'2020-12-15 20:13:04.255441','{"L_ID": 1, "L_USER": "single.user", "L_TABLE": "gn_role", "L_RECORD_ID": 3, "L_START_DATE": "2020-12-14 04:52:10.613702"}');
INSERT INTO tracking VALUES(9,'single.user','locking',3,2,'2020-12-15 20:13:06.681657','{"L_ID": 2, "L_USER": "single.user", "L_TABLE": "gn_role", "L_RECORD_ID": 3, "L_START_DATE": "2020-12-14 04:55:04.766936"}');
INSERT INTO tracking VALUES(10,'single.user','locking',3,3,'2020-12-15 20:13:08.828664','{"L_ID": 3, "L_USER": "single.user", "L_TABLE": "gn_role", "L_RECORD_ID": 4, "L_START_DATE": "2020-12-14 04:55:08.217294"}');
INSERT INTO tracking VALUES(11,'single.user','locking',3,4,'2020-12-15 20:13:11.040779','{"L_ID": 4, "L_USER": "single.user", "L_TABLE": "gn_role", "L_RECORD_ID": 5, "L_START_DATE": "2020-12-14 04:55:10.349283"}');
INSERT INTO tracking VALUES(12,'single.user','locking',3,5,'2020-12-15 20:13:12.777443','{"L_ID": 5, "L_USER": "single.user", "L_TABLE": "gn_role", "L_RECORD_ID": 6, "L_START_DATE": "2020-12-14 04:55:12.332878"}');
INSERT INTO tracking VALUES(13,'single.user','gn_user',2,1,'2020-12-15 20:49:34.914242','{"U_ID": 1, "U_ACTIVE": true, "U_NAME": "mbertens", "U_ROLE": 1, "U_HASH_PASSWORD": "5701mb", "U_MUST_CHANGE": false, "U_FIRST_NAME": "Marc", "U_MIDDLE_NAME": "", "U_LAST_NAME": "Bertens-Nguyen", "U_EMAIL": "m.bertens@pe2mbs.nl", "U_ACCESS_TOKEN": null, "U_REFRESH_TOKEN": null, "U_TOKEN_DT": null, "U_CREATE_DT": null, "U_REMARK": "", "U_LOCALE": 1, "U_LISTITEMS": 25}');
INSERT INTO tracking VALUES(14,'single.user','gn_user',2,1,'2020-12-15 20:49:38.828882','{"U_ID": 1, "U_ACTIVE": true, "U_NAME": "mbertens", "U_ROLE": 1, "U_HASH_PASSWORD": "5701mb", "U_MUST_CHANGE": false, "U_FIRST_NAME": "Marc", "U_MIDDLE_NAME": "", "U_LAST_NAME": "Bertens-Nguyen", "U_EMAIL": "m.bertens@pe2mbs.nl", "U_ACCESS_TOKEN": null, "U_REFRESH_TOKEN": null, "U_TOKEN_DT": null, "U_CREATE_DT": null, "U_REMARK": "", "U_LOCALE": 1, "U_LISTITEMS": 25}');
INSERT INTO tracking VALUES(15,'single.user','gn_user',2,1,'2020-12-15 20:49:41.024020','{"U_ID": 1, "U_ACTIVE": true, "U_NAME": "mbertens", "U_ROLE": 1, "U_HASH_PASSWORD": "5701mb", "U_MUST_CHANGE": false, "U_FIRST_NAME": "Marc", "U_MIDDLE_NAME": "", "U_LAST_NAME": "Bertens-Nguyen", "U_EMAIL": "m.bertens@pe2mbs.nl", "U_ACCESS_TOKEN": null, "U_REFRESH_TOKEN": null, "U_TOKEN_DT": null, "U_CREATE_DT": null, "U_REMARK": "", "U_LOCALE": 1, "U_LISTITEMS": 25}');
INSERT INTO tracking VALUES(16,'single.user','gn_user',3,1,'2020-12-18 09:00:29.980156','{"U_ID": 1, "U_ACTIVE": true, "U_NAME": "mbertens", "U_ROLE": 1, "U_HASH_PASSWORD": "5701mb", "U_MUST_CHANGE": false, "U_FIRST_NAME": "Marc", "U_MIDDLE_NAME": "", "U_LAST_NAME": "Bertens-Nguyen", "U_EMAIL": "m.bertens@pe2mbs.nl", "U_ACCESS_TOKEN": null, "U_REFRESH_TOKEN": null, "U_TOKEN_DT": null, "U_CREATE_DT": null, "U_REMARK": "", "U_LOCALE": 1, "U_LISTITEMS": 25}');
INSERT INTO tracking VALUES(17,'single.user','tracking',3,1,'2021-01-01 09:27:19.267699','{"T_ID": 1, "T_USER": "single.user", "T_TABLE": "gn_role", "T_ACTION": 1, "T_RECORD_ID": 6, "T_CHANGE_DATE_TIME": "2020-12-14 04:53:37.598164", "T_CONTENTS": "{\"R_ID\": 6, \"R_ROLE\": \"Test Automation engineer\", \"R_REMARK\": \"\"}"}');

INSERT INTO gn_user VALUES(1,1,'testing',1,'testing',0,'test','','testing','test@example.com',NULL,NULL,NULL,NULL,'{"theme": "equensworldline-theme", "objects": {"DemoTable": {"filters": [], "pageIndex": 0, "pageSize": 5, "pageSizeOptions": [5, 10, 25, 100]}, "RecordLocksTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}, "RoleTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}, "TrackingTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}, "UserTable": {"filters": [], "pageIndex": 0, "pageSize": 10, "pageSizeOptions": [5, 10, 25, 100]}}}',1,25);
INSERT INTO gn_user VALUES(2,1,'testuser',1,'testuser1@A',0,'test','','hello','test@example.com',NULL,NULL,NULL,NULL,NULL,1,25);
COMMIT;