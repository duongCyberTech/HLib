create database hcmutlib;

use hcmutlib;

create table users(
	uid  varchar(50) primary key,
    fname nvarchar(20) not null,
    mname nvarchar(20) not null,
    lname nvarchar(20) not null,
    username varchar(50) unique,
    password varchar(50) not null,
    email varchar(50) unique,
    avata varchar(100) ,
    status smallint default 1, -- able (1), disable (0)
    role varchar(10) default 'user',
    salary decimal(10,2)
);


alter table users 
drop column password,
add column password nvarchar(255);
select*from users



