DROP DATABASE IF EXISTS hcmutlib;

create database hcmutlib
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

use hcmutlib;

-- Table Structure of main entities
-- Users, Collections, Documents, Topics, Subjects, Specializations, Faculties
create table users(
	uid  varchar(255) primary key,
    fname nvarchar(20) not null,
    mname nvarchar(20) not null,
    lname nvarchar(20) not null,
    username varchar(20) unique,
    password varchar(100) not null,
    email varchar(100) unique,
    avata text ,
    status enum('inactive', 'active', 'banned') default 'inactive', -- inactive, active, banned (not allowed to write or post in forum)
    role varchar(10) default 'user',
    salary decimal(10,2) default 0.00, -- for staff only
    budget decimal(10,2) default 0.00 -- for staff only
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table collections(
    cid varchar(255) primary key,
    name nvarchar(255) not null,
    description text,
    status enum('private', 'read_only', 'public') default 'private',
    create_date datetime default current_timestamp,
    update_date datetime default current_timestamp,
    uid varchar(255) not null,
    foreign key (uid) references users(uid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table faculties(
    faculty_id varchar(255) primary key,
    name nvarchar(255) not null,
    description text
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table specializations(
    spec_id varchar(255) primary key,
    name nvarchar(255) not null,
    description text,
    faculty_id varchar(255) not null,
    foreign key (faculty_id) references faculties(faculty_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table subjects(
    sid varchar(255) primary key,
    name nvarchar(255) not null,
    description text,
    spec_id varchar(255) not null,
    foreign key (spec_id) references specializations(spec_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table topics(
    tid varchar(255) primary key,
    name nvarchar(255) not null,
    sid varchar(255) not null,
    description text,
    foreign key (sid) references subjects(sid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table documents(
    did varchar(255) primary key,
    title nvarchar(255) not null,
    status enum('private', 'read_only', 'public') default 'private',
    upload_date datetime default current_timestamp,
    description text,
    file_path text not null,
    file_size int,
    file_type varchar(10),
    pages smallint,
    nb_of_favorites int default 0,
    fee decimal(10,2) default 0.00,
    cid varchar(255) not null,
    uid varchar(255) not null,
    tid varchar(255) not null,
    constraint fk_con
        foreign key (tid) references topics(tid),
        foreign key (cid) references collections(cid),
        foreign key (uid) references users(uid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table threads(
    thread_id varchar(255) primary key,
    name nvarchar(255) not null,
    caption text not null,
    create_date datetime default current_timestamp,
    update_date datetime default current_timestamp,
    uid varchar(255) not null,
    foreign key (uid) references users(uid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table messages(
    message_id varchar(255) primary key,
    content text not null,
    date_post datetime default current_timestamp,
    thread_id varchar(255) not null,
    uid varchar(255) not null,
    foreign key (thread_id) references threads(thread_id),
    foreign key (uid) references users(uid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Table Structure of relationships

create table access_docs(
    uid varchar(255) not null,
    did varchar(255) not null,
    access_time datetime default current_timestamp,
    nb_of_access int default 0,
    access_range enum('read', 'write', 'delete', 'none') default 'none', -- docs status(private) -> access range(none), public -> access range(read, write, delete) with default 'read'
    foreign key (uid) references users(uid),
    foreign key (did) references documents(did),
    primary key (uid, did)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table favorites(
    uid varchar(255) not null,
    did varchar(255) not null,
    foreign key (uid) references users(uid),
    foreign key (did) references documents(did),
    primary key (uid, did)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table order_docs(
    uid varchar(255) not null,
    did varchar(255) not null,
    order_date datetime default current_timestamp,
    foreign key (uid) references users(uid),
    foreign key (did) references documents(did),
    primary key (uid, did)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table tags(
    tag_id varchar(255) primary key,
    uid varchar(255) not null,
    foreign key (uid) references users(uid),
    foreign key (tag_id) references users(uid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table courses(
	course_id varchar(255) primary key,
    title varchar(255) not null,
    discription text,
    price decimal(10,2) default 0.00,
    sale_number int default 0,
    is_active boolean default false,
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    uid varchar(255) not null,
    foreign key (uid) references users(uid)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table access_course(
    uid varchar(255) not null,
    course_id varchar(255) not null,
    access_time datetime default current_timestamp,
    nb_of_access int default 0,
    foreign key (uid) references users(uid),
    foreign key (course_id) references courses(course_id),
    primary key (uid, course_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table order_course(
    uid varchar(255) not null,
    course_id varchar(255) not null,
    order_date datetime default current_timestamp,
    foreign key (uid) references users(uid),
    foreign key (course_id) references courses(course_id),
    primary key (uid, course_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Stored Procedures
DELIMITER $$

CREATE PROCEDURE delete_collection(
    IN collection_id VARCHAR(255)
)
BEGIN
    DECLARE exit handler FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Xóa tất cả tài liệu trong collection
    DELETE FROM documents WHERE cid = collection_id;

    -- Xóa collection chính nó
    DELETE FROM collections WHERE cid = collection_id;

    COMMIT;
END$$

DELIMITER ;


-- Triggers
DELIMITER $$

CREATE TRIGGER after_document_ordered
AFTER INSERT ON order_docs
FOR EACH ROW
BEGIN
    -- Cập nhật ngân sách của người dùng sau khi đặt tài liệu
    UPDATE users
    SET budget = budget + (
        SELECT fee FROM documents WHERE did = NEW.did
    )
    WHERE uid = NEW.uid;
END$$

DELIMITER ;

-- Indexing
create index idx_users_uid on users(uid);
create index idx_collections_cid on collections(cid);
create index idx_documents_did on documents(did);
create index idx_topics_tid on topics(tid);
create index idx_subjects_sid on subjects(sid);
create index idx_specializations_spec_id on specializations(spec_id);
create index idx_faculties_faculty_id on faculties(faculty_id);
