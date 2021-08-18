CREATE TABLE "todolist" (
	"id"	INTEGER NOT NULL,
	"todoitem"	TEXT NOT NULL,
	"type"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO `todolist` (`todoitem`,`type`) VALUES ('Combinativ Softworks',1),('Test TO-DO Item',0);