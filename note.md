

dir_name = http://192.168.4.106/dedao/resource/wu

---

建表语句：

```mysql
CREATE TABLE IF NOT EXISTS `iget_class`(
   `class_id` INT UNSIGNED AUTO_INCREMENT,
   `class_name` VARCHAR(100) NOT NULL,
   `class_author` VARCHAR(40) NOT NULL,
   `class_type` INT,
   PRIMARY KEY ( `class_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```mysql
CREATE TABLE IF NOT EXISTS `iget_lesson`(
   `lesson_id` INT UNSIGNED AUTO_INCREMENT,
   `class_id` INT,
   `lesson_name` VARCHAR(100) NOT NULL,
   `lesson_text_url` VARCHAR(256) NOT NULL,
   `lesson_audio_url` VARCHAR(256) NOT NULL,
   `lesson_order` INT,
   `lesson_title` VARCHAR(128) NOT NULL,
   PRIMARY KEY ( `lesson_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

load data local infile 'iget_class.csv' into table iget_class character set utf8 fields terminated by ',' (class_id, class_name, class_author, class_type);


load data local infile 'iget_lesson.csv' into table iget_lesson character set utf8 fields terminated by ',' (lesson_id, class_id, lesson_name, lesson_text_url, lesson_audio_url, lesson_order, lesson_title);
