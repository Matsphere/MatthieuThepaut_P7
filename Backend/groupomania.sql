-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 07 fév. 2022 à 14:57
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `pub_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `comment_author_id` (`author_id`),
  KEY `comment_pub_id` (`pub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id_comment`, `author_id`, `pub_id`, `comment`, `date_created`, `date_modified`) VALUES
(12, 18, 4, '', '2022-02-01 14:14:35', '2022-02-01 14:14:35'),
(13, 18, 4, '', '2022-02-01 14:14:47', '2022-02-01 14:14:47'),
(14, 18, 4, '', '2022-02-01 14:14:47', '2022-02-01 14:14:47'),
(15, 18, 4, '', '2022-02-01 14:14:48', '2022-02-01 14:14:48'),
(16, 18, 4, '', '2022-02-01 14:14:48', '2022-02-01 14:14:48');

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

DROP TABLE IF EXISTS `publications`;
CREATE TABLE IF NOT EXISTS `publications` (
  `id_publication` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `users_liked` json NOT NULL,
  `users_disliked` json NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id_publication`),
  KEY `publication_author_id` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id_publication`, `author_id`, `title`, `text`, `users_liked`, `users_disliked`, `date_created`, `date_modified`) VALUES
(3, 17, '', 'Bonjour à tous mais pas le même', '[]', '[]', '2022-01-25 14:19:00', '2022-01-25 14:19:00'),
(4, 6, '', 'Nouvel article fraichement créé', '[]', '[]', '2022-01-31 12:19:39', '2022-02-07 14:39:39'),
(6, 18, '', 'Je rajoute un nouvel article super', '[]', '[]', '2022-02-01 14:03:55', '2022-02-01 14:04:06'),
(13, 6, 'Nouvel Article', 'Super article', '[]', '[]', '2022-02-07 15:57:11', '2022-02-07 15:57:11');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `avatar_edited` tinyint(4) NOT NULL DEFAULT '0',
  `pseudo` varchar(30) NOT NULL,
  `bio` text,
  `is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`, `avatar`, `avatar_edited`, `pseudo`, `bio`, `is_admin`, `is_active`, `date_created`, `date_modified`) VALUES
(6, 'test1@test.com', '$2b$10$0bU6quB/WVWn65pmB.iDcebWlbVDinXEsySsTwEIsiJEEFqA0bWCu', 'dog-3168589_1280.jpg1643717799308.jpg', 1, 'admin', 'Bonjour à tous et à toutes! Je suis administrateur!', 1, 1, '2022-01-18 12:12:13', '2022-02-07 15:18:02'),
(11, 'test2@test.com', '$2b$10$YxYa3OvSeXBlP.l5eo.ELuK5ir7xCvaDbeATvMh9KJyHgZe2LkJOq', 'default.jpg', 0, 'test2', NULL, 0, 1, '2022-01-18 15:02:31', '2022-01-18 15:02:31'),
(12, 'test3@test.com', '$2b$10$1MjTn17fm4sds7iaoszl/.qRPOWopJUoBU9nkFBLm5unweHu0SXli', 'default.jpg', 0, 'test3', NULL, 0, 1, '2022-01-18 15:04:29', '2022-01-18 15:04:29'),
(14, 'test4@test.com', '$2b$10$0XT6nitRw8OQY2e30jAFlObIbrQph4UsLTQDHt2w4Yn.HrwR9749O', 'default.jpg', 0, 'test4', NULL, 0, 1, '2022-01-18 15:08:30', '2022-01-18 15:08:30'),
(15, 'test5@test.com', '$2b$10$VxbSYJWxlv3EWWUfCw1InO5lDZef9dMG93ANj39DFPqVn9GzkgshS', 'default.jpg', 0, 'test5', NULL, 0, 1, '2022-01-25 14:14:43', '2022-01-25 14:14:43'),
(16, 'test6@test.com', '$2b$10$78D7n9pm/Z35nxJWt2UxKeGu.HIcHc9goJ0utb4wNSKyo7YbZmh3q', 'default.jpg', 0, 'test6', NULL, 0, 1, '2022-01-25 14:16:13', '2022-01-25 14:16:13'),
(17, 'test7@test.com', '$2b$10$ClnmjF1lO/lQpr9mAnIclOcZssyMSiQcYjZeK0Bxo5k2t36MkLiN.', 'default.jpg', 0, 'test7', NULL, 0, 1, '2022-01-25 14:16:51', '2022-01-25 14:16:51'),
(18, 'test10@test.com', '$2b$10$LyvuL5Zn86t9PRG96FiiXOkdIRZPnLApWc.RoL0JqJJFbbwsq41xy', 'logo.png1643721069135.png', 1, 'test10', NULL, 0, 1, '2022-02-01 14:03:19', '2022-02-01 14:11:09');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment_pub` FOREIGN KEY (`pub_id`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_user` FOREIGN KEY (`author_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `pub_user` FOREIGN KEY (`author_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
