create table users (
    id bigint not null auto_increment primary key,
    email varchar(60) not null,
    pwd varchar(60) not null,
    nicheng varchar(60) not null,
    updtime timestamp not null,
    role tinyint not null default 0, /*0代表普通用户，1代表商家， 2代表管理员*/
    createtime timestamp not null,
    msgnum int(4) default 0,
    unique key emailuniq (email),
    unique key nichenguniq (nicheng)
)ENGINE=innodb DEFAULT CHARSET=utf8;