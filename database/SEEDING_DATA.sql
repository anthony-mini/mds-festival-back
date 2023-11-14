USE festival;

-- Insertion des données dans la table festival
INSERT INTO `festival` (`nom`) VALUES
('Festival de musique'),
('Festival de théâtre'),
('Festival de danse'),
('Festival de cinéma'),
('Festival de cirque');

-- Insertion des données dans la table site
INSERT INTO `site` (`nom`, `image`, `capacite`) VALUES
('Grande Scène', 'grande_scene.jpg', 20000),
('Petite Scène', 'petite_scene.jpg', 5000),
('Espace Vert', 'espace_vert.jpg', 15000),
('Salle Couverte', 'salle_couverte.jpg', 8000);

-- Insertion des données dans la table festivalier
INSERT INTO `festivalier` (`nom`, `prenom`, `email`, `statut`) VALUES
('Durand', 'Alice', 'alice.durand@example.com', 'adulte'),
('Dupont', 'Bob', 'bob.dupont@example.com', 'adulte'),
('Martin', 'Charlie', 'charlie.martin@example.com', 'etudiant'),
('Lefebvre', 'Diana', 'diana.lefebvre@example.com', 'enfant');

-- Insertion des données dans la table edition en utilisant les ID des tables festival et site
INSERT INTO `edition` (`id_festival`, `id_site`, `debut`, `nb_jours`) VALUES
((SELECT id_festival FROM festival WHERE nom = 'Festival de musique'), (SELECT id_site FROM site WHERE nom = 'Grande Scène'), '2023-06-20', 5),
((SELECT id_festival FROM festival WHERE nom = 'Festival de théâtre'), (SELECT id_site FROM site WHERE nom = 'Petite Scène'), '2023-07-11', 4),
((SELECT id_festival FROM festival WHERE nom = 'Festival de danse'), (SELECT id_site FROM site WHERE nom = 'Espace Vert'), '2023-08-15', 3),
((SELECT id_festival FROM festival WHERE nom = 'Festival de cinéma'), (SELECT id_site FROM site WHERE nom = 'Salle Couverte'), '2023-09-10', 6);

-- Insertion des données dans la table lieu en utilisant l'ID de la table site
INSERT INTO `lieu` (`id_site`, `nom`, `zone`, `type`) VALUES
((SELECT id_site FROM site WHERE nom = 'Grande Scène'), 'Scène Principale', 'Zone A', 'outdoor'),
((SELECT id_site FROM site WHERE nom = 'Petite Scène'), 'Scène Secondaire', 'Zone B', 'salle'),
((SELECT id_site FROM site WHERE nom = 'Espace Vert'), 'Zone de Détente', 'Zone C', 'outdoor'),
((SELECT id_site FROM site WHERE nom = 'Salle Couverte'), 'Hall Exposition', 'Zone D', 'hall');

-- Insertion des données dans la table scene en utilisant les ID des tables lieu et edition
INSERT INTO `scene` (`id_lieu`, `id_edition`, `capacite`) VALUES
((SELECT id_lieu FROM lieu WHERE nom = 'Scène Principale'), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de musique')), 20000),
((SELECT id_lieu FROM lieu WHERE nom = 'Scène Secondaire'), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de théâtre')), 5000);

-- Insertion des données dans la table stand en utilisant les ID des tables lieu et edition
INSERT INTO `stand` (`id_lieu`, `id_edition`, `vendeur`, `redevance`) VALUES
((SELECT id_lieu FROM lieu WHERE nom = 'Zone de Détente'), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de danse')), 'Stand Boissons', 300.50),
((SELECT id_lieu FROM lieu WHERE nom = 'Hall Exposition'), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de cinéma')), 'Stand Nourriture', 250.00);

-- Insertion des données dans la table evenement en utilisant les ID des tables scene et edition
INSERT INTO `evenement` (`id_scene`, `id_edition`, `titre`, `description`, `debut`, `fin`) VALUES
((SELECT id_scene FROM scene WHERE id_lieu = (SELECT id_lieu FROM lieu WHERE nom = 'Scène Principale')), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de musique')), 'Concert Ouverture', 'Le concert d\'ouverture du festival', '2023-06-20 18:00:00', '2023-06-20 21:00:00'),
((SELECT id_scene FROM scene WHERE id_lieu = (SELECT id_lieu FROM lieu WHERE nom = 'Scène Secondaire')), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de théâtre')), 'Pièce de Théâtre', 'Une pièce de théâtre captivante', '2023-07-11 20:00:00', '2023-07-11 22:00:00');

-- Insertion des données dans la table billet en utilisant les ID des tables festivalier et edition
INSERT INTO `billet` (`id_festivalier`, `id_edition`, `qr_code`, `privileges`) VALUES
((SELECT id_festivalier FROM festivalier WHERE nom = 'Durand' AND prenom = 'Alice'), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de musique')), '987654321', 'PARTICIPANT'),
((SELECT id_festivalier FROM festivalier WHERE nom = 'Dupont' AND prenom = 'Bob'), (SELECT id_edition FROM edition WHERE id_festival = (SELECT id_festival FROM festival WHERE nom = 'Festival de théâtre')), '123456789', 'STAFF');
