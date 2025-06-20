create database hcmutlib;

use hcmutlib;

create table users(
	uid  varchar(50) primary key,
    fname nvarchar(20) not null,
    mname nvarchar(20) not null,
    lname nvarchar(20) not null,
    username varchar(50) unique,
    password varchar(255) not null,
    email varchar(50) unique,
    avata varchar(100) ,
    status bit default 0, -- able (1), disable (0)
    role varchar(10) default 'user',
    salary decimal(10,2)
);

create table collections(
    cid varchar(50) primary key,
    name nvarchar(100) not null,
    description text,
    status bit default 1, -- private (0), read only (1), public (2)
    create_date datetime default current_timestamp,
    update_date datetime default current_timestamp,
    uid varchar(50) not null,
    foreign key (uid) references users(uid)
);

create table documents(
    did int auto_increment primary key,
    title nvarchar(100) not null,
    status smallint default 1, -- private (0), read only (1), public (2)
    upload_date datetime default current_timestamp,
    description text,
    file_path varchar(255) not null,
    file_size int,
    file_type varchar(50),
    pages int,
    nb_of_favorites int default 0,
    fee decimal(10,2) default 0.00,
    cid varchar(50) not null,
    foreign key (cid) references collections(cid)
    uid varchar(50),
    tid varchar(50) not null,
    constraint fk_con
        foreign key (tid) references topics(tid),
        foreign key (tid) references topics(tid),
        foreign key (uid) references users(uid)
);

create table topics(
    tid varchar(50) primary key,
    name nvarchar(100) not null,
    sid varchar(50) not null,
    description text,
    foreign key (sid) references subjects(sid)
);

create table subjects(
    sid varchar(50) primary key,
    name nvarchar(100) not null,
    description text,
    spec_id varchar(50) not null,
    foreign key (spec_id) references specializations(spec_id)
);

create table specializations(
    spec_id varchar(50) primary key,
    name nvarchar(100) not null,
    description text,
    field_id varchar(50) not null,
    foreign key (field_id) references fields(field_id)
);

create table fields(
    field_id varchar(50) primary key,
    name nvarchar(100) not null,
    description text,
    faculty_id varchar(50) not null,
    foreign key (faculty_id) references faculties(faculty_id)
);

create table faculties(
    faculty_id varchar(50) primary key,
    name nvarchar(100) not null,
    description text
);





