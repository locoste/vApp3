CREATE DATABASE IF NOT EXISTS vapp3;
USE vapp3;

CREATE TABLE customer (
  customer_id int(6) NOT NULL AUTO_INCREMENT,
  company varchar(30) DEFAULT NULL,
  contact varchar(30) DEFAULT NULL,
  email varchar(30) DEFAULT NULL,
  phone_number varchar(30) DEFAULT NULL,
  PRIMARY KEY (customer_id)
);

CREATE TABLE project (
  project_id int(6) NOT NULL AUTO_INCREMENT,
  project_name varchar(30) NOT NULL,
  project_description varchar(200) DEFAULT NULL,
  customer int(6) DEFAULT NULL,
  status varchar(30) DEFAULT NULL,
  internal_reference varchar(10) DEFAULT NULL,
  expected_delivery date DEFAULT NULL,
  dcme_folder varchar(50) DEFAULT NULL,
  creation_date date DEFAULT NULL,
  PRIMARY KEY (project_id),
  FOREIGN KEY (customer) REFERENCES customer (customer_id),
);

CREATE TABLE features (
  feature_id int(6) NOT NULL AUTO_INCREMENT,
  label varchar(30) DEFAULT NULL,
  attribution varchar(30) DEFAULT NULL,
  component varchar(30) DEFAULT NULL,
  compound varchar(30) DEFAULT NULL,
  ratio varchar(30) DEFAULT NULL,
  material varchar(30) DEFAULT NULL,
  heat_treatment varchar(30) DEFAULT NULL,
  surface_treatment varchar(30) DEFAULT NULL,
  width varchar(30) DEFAULT NULL,
  lenght varchar(30) DEFAULT NULL,
  height varchar(30) DEFAULT NULL,
  volume varchar(30) DEFAULT NULL,
  manufacturing varchar(30) DEFAULT NULL,
  tolerance varchar(30) DEFAULT NULL,
  rugosity varchar(30) DEFAULT NULL,
  comments varchar(30) DEFAULT NULL,
  part_reference varchar(10) DEFAULT NULL,
  creation_date date DEFAULT NULL,
  modification_date date DEFAULT NULL,
  feature_status varchar(20) DEFAULT NULL,
  check_label tinyint(1) DEFAULT NULL,
  metal tinyint(1) DEFAULT NULL,
  plastic tinyint(1) DEFAULT NULL,
  project int(6) DEFAULT NULL,
  PRIMARY KEY (feature_id),
  FOREIGN KEY (project) REFERENCES project (project_id)
);

CREATE TABLE documents (
  document_id int(6) NOT NULL AUTO_INCREMENT,
  document_name varchar(256) DEFAULT NULL,
  dcme_3dscan varchar(30) DEFAULT NULL,
  adress_id varchar(256) DEFAULT NULL,
  feature int(6) DEFAULT NULL,
  project int(6) DEFAULT NULL,
  PRIMARY KEY (document_id),
  FOREIGN KEY (feature) REFERENCES features(feature_id),
  FOREIGN KEY (project) REFERENCES project(project_id)
);

CREATE TABLE product_quantity (
  quantity_id int(6) NOT NULL AUTO_INCREMENT,
  quantity int(11) DEFAULT NULL,
  lot_size int(11) DEFAULT NULL,
  number_of_lot int(11) DEFAULT NULL,
  default_label varchar(200) DEFAULT NULL,
  project int(6) DEFAULT NULL,
  PRIMARY KEY (quantity_id),
  FOREIGN KEY (project) REFERENCES project (project_id)
);

CREATE TABLE sessions (
  session_id int(128) NOT NULL,
  expires int(11) DEFAULT NULL,
  data text DEFAULT NULL,
  PRIMARY KEY (session_id)
);

CREATE TABLE users (
  user_id int(6) NOT NULL AUTO_INCREMENT,
  login varchar(30) DEFAULT NULL,
  password varchar(30) DEFAULT NULL,
  customer int(6) DEFAULT NULL,
  role varchar(5) DEFAULT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (customer) REFERENCES customer(customer_id)
);

CREATE TABLE sequence_analysis(
  id int AUTO_INCREMENT NOT NULL,
  groupe int DEFAULT NULL,
  tranfert int DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product_sequence(
  id int AUTO_INCREMENT NOT NULL,
  product_id int DEFAULT NULL,
  product varchar(256) DEFAULT NULL,
  manufacturer varchar(10) DEFAULT NULL,
  begin_date varchar(64) DEFAULT NULL,
  end_date varchar(64) DEFAULT NULL,
  quantity integer DEFAULT NULL,
  `of` varchar(256) DEFAULT NULL,
  delivery_date varchar(64) DEFAULT NULL,
  pere int DEFAULT NULL,
  analysis int DEFAULT NULL,
  groupe int DEFAULT NULL,
  age varchar(8) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (analysis) REFERENCES sequence_analysis(id)
);