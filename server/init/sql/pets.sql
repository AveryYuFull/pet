create table pets (
    id bigint not null auto_increment primary key,
    uid bigint not null,
    nickname varchar(60) not null,
    pet_type varchar(8) not null,
    pet_breed varchar(60) not null,
    sex varchar(8) not null,
    age int not null,
    pet_intro_info varchar(256) not null,
    pet_photo varchar(125) not null,
    updated_time timestamp not null,
    created_time timestamp not null
) ENGINE=innodb DEFAULT CHARSET=utf8;