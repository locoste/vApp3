-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vapp3
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer` (
  `customer_id` int(6) NOT NULL AUTO_INCREMENT,
  `company` varchar(30) DEFAULT NULL,
  `contact` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Thalès','Gérard','gerard.collomb@gmail.fr','0897654562'),(2,'Thalès2','Gérard2','gerard2.collomb2@gmail.fr','0897654562'),(3,'toto & co','toto 1er du nom','toto@hotmail.fr','0745367298'),(4,'toto & co','toto 1er du nom','toto@hotmail.fr','0745367298'),(5,'toto & co','toto 1er du nom','toto@hotmail.fr','0745367298'),(6,'toto3','toto','toto@gmail.com','0987654321'),(7,'toto3','toto','toto@gmail.com','0987654321'),(8,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(9,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(10,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(11,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(12,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(13,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(14,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(15,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(16,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(17,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(18,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(19,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(20,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(21,'toto&company','Gerard','gerard.depardieu@vodka.fr','0894576213'),(22,'kerugy','yug','uiyg','uygr'),(23,'kerugy','yug','uiyg','uygr'),(24,'kerugy','yug','uiyg','uygr'),(25,'kerugy','yug','uiyg','uygr'),(26,'kerugy','yug','uiyg','uygr'),(27,'FZEF','ZFE','ZEF','undefined'),(28,'kerugy','yug','uiyg','uygr'),(29,'kerugy','yug','uiyg','uygr'),(30,'kerugy','yug','uiyg','uygr'),(31,'kerugy','yug','uiyg','uygr'),(32,'kerugy','yug','uiyg','uygr'),(33,'kerugy','yug','uiyg','uygr'),(34,'test company','M.test','m.tesst@test&co.fr','0987654321'),(35,'test company','M.test','m.tesst@test&co.fr','0987654321'),(36,'test company','M.test','m.tesst@test&co.fr','0987654321'),(37,'test company','M.test','m.tesst@test&co.fr','0987654321'),(38,'test company','M.test','m.tesst@test&co.fr','0987654321'),(39,'test company','M.test','m.tesst@test&co.fr','0987654321'),(40,'test company','M.test','m.tesst@test&co.fr','0987654321'),(41,'test company','M.test','m.tesst@test&co.fr','0987654321'),(42,'test company','M.test','m.tesst@test&co.fr','0987654321'),(43,'test company','M.test','m.tesst@test&co.fr','0987654321'),(44,'test company','M.test','m.tesst@test&co.fr','0987654321'),(45,'test company','M.test','m.tesst@test&co.fr','0987654321'),(46,'test company','M.test','m.tesst@test&co.fr','0987654321'),(47,'test company','M.test','m.tesst@test&co.fr','0987654321'),(48,'test company','M.test','m.tesst@test&co.fr','0987654321'),(49,'test company','M.test','m.tesst@test&co.fr','0987654321');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decision`
--

DROP TABLE IF EXISTS `decision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `decision` (
  `decision_id` int(6) NOT NULL AUTO_INCREMENT,
  `rank_Metal` tinyint(1) DEFAULT NULL,
  `rank_plastic` tinyint(1) DEFAULT NULL,
  `first_decision` tinyint(1) DEFAULT NULL,
  `APR_decision` tinyint(1) DEFAULT NULL,
  `TARDY_decision` tinyint(1) DEFAULT NULL,
  `Final_decision` tinyint(1) DEFAULT NULL,
  `APRcomment` varchar(255) DEFAULT NULL,
  `TARDYcomment` varchar(255) DEFAULT NULL,
  `FinalComment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`decision_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decision`
--

LOCK TABLES `decision` WRITE;
/*!40000 ALTER TABLE `decision` DISABLE KEYS */;
INSERT INTO `decision` VALUES (1,2,2,2,0,2,1,NULL,NULL,NULL),(2,2,2,2,1,1,1,NULL,NULL,NULL),(3,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(4,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(5,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(6,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(7,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(8,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(9,2,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(10,2,2,2,2,0,1,'APR comment','TARDY Test','Final Test');
/*!40000 ALTER TABLE `decision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `features` (
  `feature_id` int(6) NOT NULL AUTO_INCREMENT,
  `label` varchar(30) DEFAULT NULL,
  `attribution` varchar(30) DEFAULT NULL,
  `component` varchar(30) DEFAULT NULL,
  `compound` varchar(30) DEFAULT NULL,
  `ratio` varchar(30) DEFAULT NULL,
  `material` varchar(30) DEFAULT NULL,
  `heat_treatment` varchar(30) DEFAULT NULL,
  `surface_treatment` varchar(30) DEFAULT NULL,
  `width` varchar(30) DEFAULT NULL,
  `lenght` varchar(30) DEFAULT NULL,
  `height` varchar(30) DEFAULT NULL,
  `volume` varchar(30) DEFAULT NULL,
  `manufacturing` varchar(30) DEFAULT NULL,
  `tolerance` varchar(30) DEFAULT NULL,
  `rugosity` varchar(30) DEFAULT NULL,
  `comments` varchar(30) DEFAULT NULL,
  `part_reference` varchar(10) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `modification_date` date DEFAULT NULL,
  `feature_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'label 1',NULL,NULL,NULL,'4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'label 2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'uyfuiyf','TARDY','uygui','fyiu','fyiu','fyuiy','guiyg','uigy','uigy','iu','gyiu','gyiu','gyui','gyui','gyui','gyiugy','popopo',NULL,'2019-01-25',NULL),(4,'azef','TARDY','zef','ergiogh','ugy','uigy','uigi','ho','jioji','poij','poij','poij','oj','poip','uihpkjn','iojhpib','zaer','2019-01-24','2019-01-25','Submitted'),(5,'aazer','undefined','azeraer','zergzrt','rbogu','uivi','uvi','hv','iuhv','uyg','uoygou','gyi','ug','piuhp','yu','yfog','azer','2019-01-24',NULL,'Submitted'),(6,'ifyitfyu','TARDY','uiyfi','uygiu','fy','iug','piuh','poji','poîhj','mojpo',':jg','luglhoih','oihpo','ihpoiu','poiupo','iupoiu','ytyerty','2019-01-25','2019-01-25','Submitted'),(7,'azerev','TARDY','kjfg','jkgy','iluh','ih','lih','luoh','luh','luh','kljh','lkjh','kjg','kjg','kjyg','kjh','undefined','2019-01-25','2019-01-25','Submitted');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `product_id` int(6) NOT NULL AUTO_INCREMENT,
  `is_metal` tinyint(1) DEFAULT NULL,
  `is_plastic` tinyint(1) DEFAULT NULL,
  `features` int(11) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `project` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_features` (`features`),
  CONSTRAINT `FK_features` FOREIGN KEY (`features`) REFERENCES `features` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,1,1,NULL,NULL),(2,1,1,2,NULL,NULL),(3,NULL,NULL,3,NULL,NULL),(4,1,1,NULL,'z',1),(5,1,1,NULL,'aekrg',1),(8,0,0,3,'toto',17),(9,0,0,4,'azef',17),(10,0,0,5,'azefaez',14),(11,0,0,6,'fghf',18),(12,0,0,7,'iuzegf',18);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_quantity`
--

DROP TABLE IF EXISTS `product_quantity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product_quantity` (
  `quantity_id` int(6) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `lot_size` int(11) DEFAULT NULL,
  `number_of_lot` int(11) DEFAULT NULL,
  `default_label` varchar(200) DEFAULT NULL,
  `project` int(11) DEFAULT NULL,
  PRIMARY KEY (`quantity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_quantity`
--

LOCK TABLES `product_quantity` WRITE;
/*!40000 ALTER TABLE `product_quantity` DISABLE KEYS */;
INSERT INTO `product_quantity` VALUES (1,34,12,25,NULL,NULL),(2,65,34,2,NULL,NULL),(3,123,56,768,'test',NULL),(4,123,56,768,'test',NULL),(5,123,56,7,'test',NULL),(6,123,56,7,'test',NULL),(7,1234,647,768,'test',NULL),(8,345,65,97,'test 2',NULL),(9,1234,56,97,'levh',NULL),(10,1234,647,768,'test',17),(11,1234,56,97,'test 2',17),(12,1234,65,768,'zertre',16),(13,123,647,7,'test 2',18);
/*!40000 ALTER TABLE `product_quantity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sequence`
--

DROP TABLE IF EXISTS `product_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product_sequence` (
  `sequence_id` int(6) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `features` varchar(30) DEFAULT NULL,
  `label` varchar(30) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `attribution` varchar(30) DEFAULT NULL,
  `dependancies` int(11) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `project` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`sequence_id`),
  KEY `project` (`project`),
  CONSTRAINT `product_sequence_ibfk_1` FOREIGN KEY (`project`) REFERENCES `project` (`project_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sequence`
--

LOCK TABLES `product_sequence` WRITE;
/*!40000 ALTER TABLE `product_sequence` DISABLE KEYS */;
INSERT INTO `product_sequence` VALUES (1,1,'ifyitfyu','Test 1','2019-02-12','PROD','TARDY',0,'Test',NULL);
/*!40000 ALTER TABLE `product_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project` (
  `project_id` int(6) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(30) NOT NULL,
  `project_description` varchar(200) DEFAULT NULL,
  `product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `customer` int(11) DEFAULT NULL,
  `decision` int(11) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `internal_reference` varchar(10) DEFAULT NULL,
  `project_reference` varchar(10) DEFAULT NULL,
  `expected_delivery` date DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `FK_product` (`product`),
  KEY `FK_quantity` (`quantity`),
  KEY `FK_customer` (`customer`),
  KEY `FK_decision` (`decision`),
  CONSTRAINT `FK_customer` FOREIGN KEY (`customer`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `FK_decision` FOREIGN KEY (`decision`) REFERENCES `decision` (`decision_id`),
  CONSTRAINT `FK_product` FOREIGN KEY (`product`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_quantity` FOREIGN KEY (`quantity`) REFERENCES `product_quantity` (`quantity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'toto1','toto1 description',1,1,1,1,NULL,NULL,NULL,NULL),(2,'toto2','toto2 description',NULL,2,2,2,NULL,NULL,NULL,NULL),(4,'test','NEw test description',NULL,NULL,2,NULL,NULL,NULL,NULL,NULL),(5,'toto fait des gateaux','toto fait effectivement des gateaux',NULL,NULL,2,NULL,NULL,NULL,NULL,NULL),(12,'ergzerg','test update Description',NULL,NULL,6,NULL,'Submited',NULL,NULL,NULL),(13,'aeg','undefined',NULL,NULL,8,NULL,'Submited',NULL,NULL,NULL),(14,'zefaer','undefined',NULL,NULL,8,NULL,'Submited',NULL,NULL,NULL),(15,'aezrgfaer','kazjhefgjkg',NULL,NULL,3,NULL,'Submited',NULL,NULL,NULL),(16,'zertre','ertzer',NULL,NULL,8,NULL,'Submited',NULL,NULL,'2019-01-22'),(17,'Global test','global test',NULL,9,3,9,'Submited',NULL,NULL,'2019-01-15'),(18,'test semi final','test desc',NULL,NULL,8,10,'Submited','TOCO-001',NULL,'2019-01-31');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-01 10:56:13
