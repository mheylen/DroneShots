drop table if exists videos;
drop table if exists buyer;
drop table if exists users;

create table users(
    id serial primary key,
    email varchar(20) not null,
    password varchar(64) not null
);
-- insert into users (email, password)
-- values ('mnheylen@gmail.com','DopeDrone');

create table buyer(
    buyer_id serial primary key,
    downloads_remaining INTEGER
    
);
-- insert into buyer(downloads_remaining)
-- values (4);

create table videos(
    videos_id serial primary key,
    title varchar(60) not null,
    description varchar (150) not null,
    tag varchar (150) not null,
    video text,
    users_id integer references users(id)
);
-- insert into videos (videos_id, title, description, tag, video)
-- values (1, 'Flying In Desert', 'flying over Phoenix desert', 'desert, hot, sand, cactus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNhursh2RXfyReJhrkr37CREf0ksM2EyfjRAtXQm3FQnFTrT7');

