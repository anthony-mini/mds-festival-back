-- Création du schéma pour la base de données festival
DROP DATABASE IF EXISTS `festival`;
CREATE DATABASE IF NOT EXISTS `festival` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `festival`;

-- Si utilisateur existe déja on la drop 

DROP USER IF EXISTS `admin`@`localhost`;
DROP USER IF EXISTS `ingeneer`@`localhost`;
DROP USER IF EXISTS `app`@`localhost`;

-- Création des trois utilisateurs avec les privilèges appropriés
-- Utilisateur 'admin' avec un accès restreint à la base de données
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT USAGE ON *.* TO 'admin'@'localhost';
GRANT ALL PRIVILEGES ON festival.* TO 'admin'@'localhost';

-- Utilisateur 'ingeneer' avec des privilèges de requêtage et altération
CREATE USER 'ingeneer'@'localhost' IDENTIFIED BY 'ingeneer';
GRANT SELECT, INSERT, UPDATE, DELETE ON festival.* TO 'ingeneer'@'localhost';

-- Utilisateur 'app' avec des privilèges de requêtage uniquement
CREATE USER 'app'@'localhost' IDENTIFIED BY 'app';
GRANT SELECT ON festival.* TO 'app'@'localhost';

-- Appliquer les privilèges
FLUSH PRIVILEGES;

