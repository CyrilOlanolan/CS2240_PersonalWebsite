-- CREATE DATABASE
CREATE DATABASE pa4_management_system;
USE pa4_management_system;

-- CREATE STUDENTS TABLE
CREATE TABLE `pa4_management_system`.`students` (
    `studentID` INT NOT NULL AUTO_INCREMENT,
    `studentLastName` VARCHAR(50) NOT NULL,
    `studentFirstName` VARCHAR(50) NOT NULL,
    `studentMiddleName` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`studentID`)
)  ENGINE=INNODB;

-- CREATE SUBJECTS TABLE
CREATE TABLE `pa4_management_system`.`subjects` (
    `subjectID` INT NOT NULL AUTO_INCREMENT,
    `subjectTitle` VARCHAR(200) NOT NULL,
    `subjectNo` VARCHAR(50) NOT NULL,
    `transcriptLoad` INT NOT NULL,
    `payingLoad` INT NOT NULL,
    `teachingLoad` INT NOT NULL,
    PRIMARY KEY (`subjectID`)
)  ENGINE=INNODB;

-- CREATE TEACHERS TABLE
CREATE TABLE `pa4_management_system`.`teachers` (
    `teacherID` INT NOT NULL AUTO_INCREMENT,
    `teacherLastName` VARCHAR(50) NOT NULL,
    `teacherFirstName` VARCHAR(50) NOT NULL,
    `teacherMiddleName` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`teacherID`)
)  ENGINE=INNODB;