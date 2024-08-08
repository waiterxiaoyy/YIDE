create database yide;

use yide;

create table `user` (
    `id` int not null auto_increment,
    `username` varchar(25) not null,
    `password` varchar(64) not null,
    `avatar` longtext comment '头像',
    `phone` varchar(20) default null comment '电话',
    `create_time` datetime not null,
    `update_time` datetime not null,
    primary key (`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';

INSERT INTO `user` (`username`, `password`, `avatar`, `phone`, `create_time`, `update_time`) 
VALUES ('testuser', 'password123', 'avatar_image_data', '1234567890', NOW(), NOW());


create table `file` (
    `id` int not null auto_increment,
    `user_id` int not null,
    `name` varchar(255) not null,
    `type` varchar(255) not null,
    `size` int,
    `create_time` datetime not null,
    primary key (`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='文件表';

INSERT INTO `file` (`user_id`, `name`, `type`, `size`, `create_time`)
VALUES (1, 'index.html', 'html', 1024, NOW());

INSERT INTO `file` (`user_id`, `name`, `type`, `size`, `create_time`)
VALUES (1, 'script.js', 'js', 1024, NOW());

INSERT INTO `file` (`user_id`, `name`, `type`, `size`, `create_time`)
VALUES (1, 'style.css', 'css', 1024, NOW());

create table `file_content` (
    `id` int not null auto_increment,
    `file_id` int not null,
    `content` longtext,
    `create_time` datetime not null,
    `update_time` datetime not null,
    primary key (`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='文件内容表';

INSERT INTO `file_content` (`file_id`, `content`, `create_time`, `update_time`)
VALUES (1, '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
', NOW(), NOW());

INSERT INTO `file_content` (`file_id`, `content`, `create_time`, `update_time`)
VALUES (2, '
console.log("Hello World");
', NOW(), NOW());

INSERT INTO `file_content` (`file_id`, `content`, `create_time`, `update_time`)
VALUES (3, '
body {
    background-color: #f0f0f0;
}
', NOW(), NOW());