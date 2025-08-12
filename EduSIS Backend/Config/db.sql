-- EduSIS v1 schema (MySQL 8.0+)
-- - Uses InnoDB + utf8mb4
-- - Normalized departments
-- - Correct FKs (announcement -> course)
-- - Best-three rule for quizzes+assignment
-- - BEFORE INSERT/UPDATE trigger validates marks, sets total + letter
-- - Unique submissions per (assignment, student)
-- - Basic audit columns on key tables
-- - CHECKs for blood group and phone length
-- NOTE: Store only password hashes (application should hash+salt)

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS university_management
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE university_management;

-- ----------------------
-- Core reference tables
-- ----------------------
CREATE TABLE department (
  department_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name         VARCHAR(255) NOT NULL,
  location     TEXT,
  dept_email   VARCHAR(255) NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (department_id),
  UNIQUE KEY uk_department_email (dept_email)
) ENGINE=InnoDB;

CREATE TABLE admin (
  admin_id      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (admin_id),
  UNIQUE KEY uk_admin_email (email)
) ENGINE=InnoDB;

CREATE TABLE teacher (
  teacher_id     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  department_id  BIGINT UNSIGNED NULL,
  name           VARCHAR(255) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  designation    VARCHAR(255),
  date_of_birth  DATE,
  blood_group    VARCHAR(3),
  address        TEXT,
  phone_number   VARCHAR(20),
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (teacher_id),
  UNIQUE KEY uk_teacher_email (email),
  KEY idx_teacher_department (department_id),
  CONSTRAINT fk_teacher_department
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL,
  CONSTRAINT chk_teacher_blood
    CHECK (blood_group IS NULL OR blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  CONSTRAINT chk_teacher_phone_len
    CHECK (phone_number IS NULL OR CHAR_LENGTH(phone_number) BETWEEN 7 AND 20)
) ENGINE=InnoDB;

CREATE TABLE student (
  student_id     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  department_id  BIGINT UNSIGNED NULL,
  name           VARCHAR(255) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  address        TEXT,
  date_of_birth  DATE,
  phone_number   VARCHAR(20),
  blood_group    VARCHAR(3),
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id),
  UNIQUE KEY uk_student_email (email),
  KEY idx_student_department (department_id),
  CONSTRAINT fk_student_department
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL,
  CONSTRAINT chk_student_blood
    CHECK (blood_group IS NULL OR blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  CONSTRAINT chk_student_phone_len
    CHECK (phone_number IS NULL OR CHAR_LENGTH(phone_number) BETWEEN 7 AND 20)
) ENGINE=InnoDB;

CREATE TABLE course (
  course_id     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  department_id BIGINT UNSIGNED NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (course_id),
  KEY idx_course_department (department_id),
  CONSTRAINT fk_course_department
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------
-- Relationships
-- ----------------------
CREATE TABLE teacher_assignment (
  teacher_id BIGINT UNSIGNED NOT NULL,
  course_id  BIGINT UNSIGNED NOT NULL,
  assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (teacher_id, course_id),
  KEY idx_ta_teacher (teacher_id),
  KEY idx_ta_course (course_id),
  CONSTRAINT fk_ta_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
  CONSTRAINT fk_ta_course  FOREIGN KEY (course_id)  REFERENCES course(course_id)  ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE student_enroll (
  student_id  BIGINT UNSIGNED NOT NULL,
  course_id   BIGINT UNSIGNED NOT NULL,
  enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, course_id),
  KEY idx_se_student (student_id),
  KEY idx_se_course  (course_id),
  CONSTRAINT fk_se_student FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
  CONSTRAINT fk_se_course  FOREIGN KEY (course_id)  REFERENCES course(course_id)  ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------
-- Course-scoped content
-- ----------------------
CREATE TABLE announcement (
  announcement_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  course_id       BIGINT UNSIGNED NOT NULL,
  title           VARCHAR(255) NOT NULL,
  description     VARCHAR(1000) NOT NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (announcement_id),
  KEY idx_ann_course (course_id),
  CONSTRAINT fk_announcement_course
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE assignment (
  assignment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  course_id     BIGINT UNSIGNED NOT NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  file_path     VARCHAR(255),
  due_date      DATETIME,
  max_points    INT,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (assignment_id),
  KEY idx_asg_course (course_id),
  CONSTRAINT fk_assignment_course
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE submission (
  submission_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_id BIGINT UNSIGNED NOT NULL,
  student_id    BIGINT UNSIGNED NOT NULL,
  content       MEDIUMTEXT,
  submitted_at  DATETIME,
  score         INT,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (submission_id),
  UNIQUE KEY uq_submission (assignment_id, student_id),
  KEY idx_sub_asg     (assignment_id),
  KEY idx_sub_student (student_id),
  CONSTRAINT fk_submission_assignment FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id) ON DELETE CASCADE,
  CONSTRAINT fk_submission_student    FOREIGN KEY (student_id)    REFERENCES student(student_id)    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE notifications (
  notification_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id      BIGINT UNSIGNED NULL,
  course_id       BIGINT UNSIGNED NULL,
  message         TEXT NOT NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (notification_id),
  KEY idx_notif_student (student_id),
  KEY idx_notif_course  (course_id),
  CONSTRAINT fk_notif_student FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
  CONSTRAINT fk_notif_course  FOREIGN KEY (course_id)  REFERENCES course(course_id)  ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------
-- Gradebook
-- ----------------------
CREATE TABLE grade (
  student_id         BIGINT UNSIGNED NOT NULL,
  course_id          BIGINT UNSIGNED NOT NULL,
  quiz1_marks        INT,
  quiz2_marks        INT,
  quiz3_marks        INT,
  assignments_marks  INT,
  attendance_marks   INT,
  mid_sem_marks      INT,
  final_sem_marks    INT,
  total_marks        INT,
  grade_letter       VARCHAR(2),
  updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, course_id),
  KEY idx_grade_student (student_id),
  KEY idx_grade_course  (course_id),
  CONSTRAINT fk_grade_student FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
  CONSTRAINT fk_grade_course  FOREIGN KEY (course_id)  REFERENCES course(course_id)  ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------
-- Calendars
-- ----------------------
CREATE TABLE student_calendar_events (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id  BIGINT UNSIGNED NOT NULL,
  title       VARCHAR(255) NOT NULL,
  start_time  DATETIME NOT NULL,
  end_time    DATETIME NOT NULL,
  description TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sce_student (student_id),
  CONSTRAINT fk_sce_student FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE teacher_calendar_events (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  teacher_id  BIGINT UNSIGNED NOT NULL,
  title       VARCHAR(255) NOT NULL,
  start_time  DATETIME NOT NULL,
  end_time    DATETIME NOT NULL,
  description TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_tce_teacher (teacher_id),
  CONSTRAINT fk_tce_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------
-- Messaging
-- ----------------------
CREATE TABLE messages (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  course_id    BIGINT UNSIGNED NOT NULL,
  student_id   BIGINT UNSIGNED NULL,
  teacher_id   BIGINT UNSIGNED NULL,
  sender_type  ENUM('student','teacher') NOT NULL,
  content      TEXT NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_msg_course  (course_id),
  KEY idx_msg_student (student_id),
  KEY idx_msg_teacher (teacher_id),
  CONSTRAINT fk_msg_course  FOREIGN KEY (course_id)  REFERENCES course(course_id)  ON DELETE CASCADE,
  CONSTRAINT fk_msg_student FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE SET NULL,
  CONSTRAINT fk_msg_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL,
  CONSTRAINT chk_sender CHECK (
    (sender_type='student' AND student_id IS NOT NULL AND teacher_id IS NULL) OR
    (sender_type='teacher' AND teacher_id IS NOT NULL AND student_id IS NULL)
  )
) ENGINE=InnoDB;

-- ======================
-- Functions & Procedures
-- ======================

-- Best-three total = attendance + mid + final + best 3 of {quiz1,quiz2,quiz3,assignments}
DELIMITER $$
DROP FUNCTION IF EXISTS compute_total_marks $$
CREATE FUNCTION compute_total_marks(
  quiz1 INT, quiz2 INT, quiz3 INT, assignments INT,
  attendance INT, mid_sem INT, final_sem INT
) RETURNS INT DETERMINISTIC
BEGIN
  SET quiz1 = COALESCE(quiz1,0);
  SET quiz2 = COALESCE(quiz2,0);
  SET quiz3 = COALESCE(quiz3,0);
  SET assignments = COALESCE(assignments,0);
  SET attendance = COALESCE(attendance,0);
  SET mid_sem = COALESCE(mid_sem,0);
  SET final_sem = COALESCE(final_sem,0);

  RETURN attendance + mid_sem + final_sem +
         (SELECT SUM(mark) FROM (
            SELECT quiz1 AS mark UNION ALL
            SELECT quiz2 UNION ALL
            SELECT quiz3 UNION ALL
            SELECT assignments
          ) m ORDER BY mark DESC LIMIT 3);
END $$
DELIMITER ;

-- Grade mapping based on total (max 300)
DELIMITER $$
DROP FUNCTION IF EXISTS calculate_grade_from_total $$
CREATE FUNCTION calculate_grade_from_total(total INT)
RETURNS VARCHAR(2) DETERMINISTIC
BEGIN
  IF total IS NULL THEN RETURN NULL; END IF;
  IF total >= 240 THEN RETURN 'A+';       -- 80%+
  ELSEIF total >= 225 THEN RETURN 'A';
  ELSEIF total >= 210 THEN RETURN 'A-';
  ELSEIF total >= 195 THEN RETURN 'B+';
  ELSEIF total >= 180 THEN RETURN 'B';
  ELSEIF total >= 165 THEN RETURN 'B-';
  ELSEIF total >= 150 THEN RETURN 'C';
  ELSEIF total >= 135 THEN RETURN 'D';
  ELSE RETURN 'F';
  END IF;
END $$
DELIMITER ;

-- Simple counts proc (faster than cursor approach)
DELIMITER $$
DROP PROCEDURE IF EXISTS get_totals $$
CREATE PROCEDURE get_totals()
BEGIN
  SELECT
    (SELECT COUNT(*) FROM course)     AS Total_Courses,
    (SELECT COUNT(*) FROM department) AS Total_Departments,
    (SELECT COUNT(*) FROM student)    AS Total_Students,
    (SELECT COUNT(*) FROM teacher)    AS Total_Teachers;
END $$
DELIMITER ;

-- Students enrolled in a course
DELIMITER $$
DROP FUNCTION IF EXISTS get_students_count_by_course $$
CREATE FUNCTION get_students_count_by_course(course_id_param BIGINT UNSIGNED)
RETURNS INT DETERMINISTIC
BEGIN
  DECLARE total INT;
  SELECT COUNT(*) INTO total FROM student_enroll WHERE course_id = course_id_param;
  RETURN total;
END $$
DELIMITER ;

-- ======================
-- Triggers (grades)
-- ======================
DELIMITER $$
DROP TRIGGER IF EXISTS grade_bi $$
CREATE TRIGGER grade_bi
BEFORE INSERT ON grade
FOR EACH ROW
BEGIN
  SET NEW.quiz1_marks       = IF(NEW.quiz1_marks BETWEEN 0 AND 15, NEW.quiz1_marks, 0);
  SET NEW.quiz2_marks       = IF(NEW.quiz2_marks BETWEEN 0 AND 15, NEW.quiz2_marks, 0);
  SET NEW.quiz3_marks       = IF(NEW.quiz3_marks BETWEEN 0 AND 15, NEW.quiz3_marks, 0);
  SET NEW.assignments_marks = IF(NEW.assignments_marks BETWEEN 0 AND 15, NEW.assignments_marks, 0);
  SET NEW.attendance_marks  = IF(NEW.attendance_marks BETWEEN 0 AND 30, NEW.attendance_marks, 0);
  SET NEW.mid_sem_marks     = IF(NEW.mid_sem_marks BETWEEN 0 AND 75, NEW.mid_sem_marks, 0);
  SET NEW.final_sem_marks   = IF(NEW.final_sem_marks BETWEEN 0 AND 150, NEW.final_sem_marks, 0);

  SET NEW.total_marks = compute_total_marks(
    NEW.quiz1_marks, NEW.quiz2_marks, NEW.quiz3_marks,
    NEW.assignments_marks, NEW.attendance_marks,
    NEW.mid_sem_marks, NEW.final_sem_marks
  );
  SET NEW.grade_letter = calculate_grade_from_total(NEW.total_marks);
END $$

DROP TRIGGER IF EXISTS grade_bu $$
CREATE TRIGGER grade_bu
BEFORE UPDATE ON grade
FOR EACH ROW
BEGIN
  SET NEW.quiz1_marks       = IF(NEW.quiz1_marks BETWEEN 0 AND 15, NEW.quiz1_marks, 0);
  SET NEW.quiz2_marks       = IF(NEW.quiz2_marks BETWEEN 0 AND 15, NEW.quiz2_marks, 0);
  SET NEW.quiz3_marks       = IF(NEW.quiz3_marks BETWEEN 0 AND 15, NEW.quiz3_marks, 0);
  SET NEW.assignments_marks = IF(NEW.assignments_marks BETWEEN 0 AND 15, NEW.assignments_marks, 0);
  SET NEW.attendance_marks  = IF(NEW.attendance_marks BETWEEN 0 AND 30, NEW.attendance_marks, 0);
  SET NEW.mid_sem_marks     = IF(NEW.mid_sem_marks BETWEEN 0 AND 75, NEW.mid_sem_marks, 0);
  SET NEW.final_sem_marks   = IF(NEW.final_sem_marks BETWEEN 0 AND 150, NEW.final_sem_marks, 0);

  SET NEW.total_marks = compute_total_marks(
    NEW.quiz1_marks, NEW.quiz2_marks, NEW.quiz3_marks,
    NEW.assignments_marks, NEW.attendance_marks,
    NEW.mid_sem_marks, NEW.final_sem_marks
  );
  SET NEW.grade_letter = calculate_grade_from_total(NEW.total_marks);
END $$
DELIMITER ;
