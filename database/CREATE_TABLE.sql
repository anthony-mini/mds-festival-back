USE festival;

-- Suppression des tables dans l'ordre inverse de la création pour éviter les erreurs de clé étrangère
DROP TABLE IF EXISTS `evenement`;
DROP TABLE IF EXISTS `stand`;
DROP TABLE IF EXISTS `scene`;
DROP TABLE IF EXISTS `billet`;
DROP TABLE IF EXISTS `lieu`;
DROP TABLE IF EXISTS `edition`;
DROP TABLE IF EXISTS `site`;
DROP TABLE IF EXISTS `festivalier`;
DROP TABLE IF EXISTS `festival`;

-- Création des tables sans dépendances
CREATE TABLE `festival` (
  `id_festival` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id_festival`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `site` (
  `id_site` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL UNIQUE,
  `image` varchar(255) NOT NULL,
  `capacite` int NOT NULL,
  PRIMARY KEY (`id_site`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `festivalier` (
  `id_festivalier` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `statut` enum('enfant', 'etudiant', 'adulte') NOT NULL DEFAULT 'adulte',
  PRIMARY KEY (`id_festivalier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Création des tables avec dépendances simples
CREATE TABLE `edition` (
  `id_edition` int NOT NULL AUTO_INCREMENT,
  `id_festival` int NOT NULL,
  `id_site` int NOT NULL,
  `debut` date NOT NULL,
  `nb_jours` int NOT NULL,
  PRIMARY KEY (`id_edition`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `lieu` (
  `id_lieu` int NOT NULL AUTO_INCREMENT,
  `id_site` int NOT NULL,
  `nom` varchar(255) NOT NULL UNIQUE,
  `zone` varchar(255) NOT NULL,
  `type` enum('outdoor', 'salle', 'sanitaires', 'hall', 'amphitheatre', 'chapiteau', 'backstage', 'loges') NOT NULL,
  PRIMARY KEY (`id_lieu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Création des tables avec dépendances multiples
CREATE TABLE `scene` (
  `id_scene` int NOT NULL AUTO_INCREMENT,
  `id_lieu` int NOT NULL,
  `id_edition` int NOT NULL,
  `capacite` int NOT NULL,
  PRIMARY KEY (`id_scene`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `stand` (
  `id_stand` int NOT NULL AUTO_INCREMENT,
  `id_lieu` int NOT NULL,
  `id_edition` int NOT NULL,
  `vendeur` varchar(255) NOT NULL,
  `redevance` float NOT NULL,
  PRIMARY KEY (`id_stand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `billet` (
  `id_festivalier` int NOT NULL,
  `id_edition` int NOT NULL,
  `qr_code` varchar(255) NOT NULL UNIQUE,
  `privileges` enum('ADMIN','STAFF','PARTICIPANT') NOT NULL DEFAULT 'PARTICIPANT',
  PRIMARY KEY (`id_festivalier`,`id_edition`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `evenement` (
  `id_evenement` int NOT NULL AUTO_INCREMENT,
  `id_scene` int NOT NULL,
  `id_edition` int NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL,
  PRIMARY KEY (`id_evenement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ajout des contraintes de clés étrangères
ALTER TABLE `edition` ADD CONSTRAINT `fk_edition_festival` FOREIGN KEY (`id_festival`) REFERENCES `festival` (`id_festival`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `edition` ADD CONSTRAINT `fk_edition_site` FOREIGN KEY (`id_site`) REFERENCES `site` (`id_site`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `lieu` ADD CONSTRAINT `fk_lieu_site` FOREIGN KEY (`id_site`) REFERENCES `site` (`id_site`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `scene` ADD CONSTRAINT `fk_scene_lieu` FOREIGN KEY (`id_lieu`) REFERENCES `lieu` (`id_lieu`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `scene` ADD CONSTRAINT `fk_scene_edition` FOREIGN KEY (`id_edition`) REFERENCES `edition` (`id_edition`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `stand` ADD CONSTRAINT `fk_stand_lieu` FOREIGN KEY (`id_lieu`) REFERENCES `lieu` (`id_lieu`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `stand` ADD CONSTRAINT `fk_stand_edition` FOREIGN KEY (`id_edition`) REFERENCES `edition` (`id_edition`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `billet` ADD CONSTRAINT `fk_billet_festivalier` FOREIGN KEY (`id_festivalier`) REFERENCES `festivalier` (`id_festivalier`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `billet` ADD CONSTRAINT `fk_billet_edition` FOREIGN KEY (`id_edition`) REFERENCES `edition` (`id_edition`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `evenement` ADD CONSTRAINT `fk_evenement_scene` FOREIGN KEY (`id_scene`) REFERENCES `scene` (`id_scene`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `evenement` ADD CONSTRAINT `fk_evenement_edition` FOREIGN KEY (`id_edition`) REFERENCES `edition` (`id_edition`) ON DELETE CASCADE ON UPDATE CASCADE;
