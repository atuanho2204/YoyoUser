DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL auto_increment,
  
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50),
  `roleMask` int,
  PRIMARY KEY (`id`)
);

INSERT INTO users (username, password, firstName, lastName, email, roleMask) VALUES
('admin', 'admin', 'Phuoc Dinh', 'Le', 'admin@gmail.com', 127),
('test', 'test1', 'Test', 'User', 'test@gmail.com', 2)
;

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50),
  `path` varchar(50),
  PRIMARY KEY (`id`)
);

INSERT INTO roles (id, name, path) VALUES
(0, 'Admin', 'admin'),
(1, 'Customer Service', 'customers'),
(2, 'Call Logs', 'calls'),
(3, 'Int\'l Shipping', 'international'),
(4, 'Domestic Shipping', 'domestic'),
(5, 'Marketing', 'marketing'),
(6, 'Warranty', 'warranty')
;

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `userId` int NOT NULL,
  `token` varchar(50)
);

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int NOT NULL auto_increment,
  `name` varchar(50),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `customerService`;

CREATE TABLE `customerService` (
  `id` int NOT NULL auto_increment,
  `firstName` varchar(50),
  `lastName` varchar(50),
  `company` varchar(50),
  `phone` varchar(20),
  `productId` int,
  `createdDate` date,
  `closedDate` date,
  `createdById` int,
  `status` varchar(50),
  `problemDetails` varchar(2000),
  `solutionDetails` varchar(2000),
  `comments` varchar(2000),
  `address` varchar(100),
  `city` varchar(100),
  `stateId` int,
  `zipcode` int,
  `email` varchar(50),
  `bccEmail` varchar(50),
  `fax` varchar(20),
  `order` varchar(50),
  `purchasedDate` date,

  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `emails`;

CREATE TABLE `emails` (
  `id` int NOT NULL auto_increment,
  `firstName` varchar(50),
  `lastName` varchar(50),
  `email` varchar(50),
  PRIMARY KEY (`id`)
);