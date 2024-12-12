--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES ('7f2abced-b82c-11ef-aa04-bc0ff35e7dd3','serdartest','1@1.com','$2a$10$O41qsHSzN8dF0OM3vvV/v.zOtEm2fvw43D3GL17n5jlANWXMX1Dne',NULL,'2024-12-12 01:57:52','2024-12-12 01:57:52');
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES ('be9299e2-b75e-11ef-96ef-bc0ff35e7dd3','iPhone 14 Pro','The latest iPhone with innovative features and powerful performance',999.99,'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80','Electronics',50,'2024-12-11 01:25:02'),('be929da3-b75e-11ef-96ef-bc0ff35e7dd3','MacBook Air M2','13-inch Retina display, M2 chip, and all-day battery life',1299.99,'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80','Electronics',30,'2024-12-11 01:25:02'),('be929e17-b75e-11ef-96ef-bc0ff35e7dd3','AirPods Pro','Active noise cancellation for immersive sound',249.99,'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&w=800&q=80','Electronics',100,'2024-12-11 01:25:02'),('be929e4f-b75e-11ef-96ef-bc0ff35e7dd3','iPad Air','10.9-inch Liquid Retina display with True Tone',599.99,'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80','Electronics',45,'2024-12-11 01:25:02'),('be929e82-b75e-11ef-96ef-bc0ff35e7dd3','Apple Watch Series 8','Advanced health features and powerful fitness tracking',399.99,'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80','Electronics',60,'2024-12-11 01:25:02'),('be929ebb-b75e-11ef-96ef-bc0ff35e7dd3','Magic Keyboard','Wireless keyboard with numeric keypad',129.99,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80','Accessories',80,'2024-12-11 01:25:02'),('be929ef2-b75e-11ef-96ef-bc0ff35e7dd3','Magic Mouse','Wireless mouse with Multi-Touch surface',79.99,'https://images.unsplash.com/photo-1615750173609-2fbf12fd1d67?auto=format&fit=crop&w=800&q=80','Accessories',70,'2024-12-11 01:25:02'),('be929f24-b75e-11ef-96ef-bc0ff35e7dd3','Apple Pencil','Pixel-perfect precision for creative work',129.99,'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80','Accessories',40,'2024-12-11 01:25:02'),('be929f5e-b75e-11ef-96ef-bc0ff35e7dd3','MagSafe Charger','Wireless charging for iPhone',39.99,'https://images.unsplash.com/photo-1600490722773-35753aea6332?auto=format&fit=crop&w=800&q=80','Accessories',150,'2024-12-11 01:25:02'),('be929f8d-b75e-11ef-96ef-bc0ff35e7dd3','AirTag','Keep track of your everyday items',29.99,'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&w=800&q=80','Accessories',200,'2024-12-11 01:25:02'),('be929fc0-b75e-11ef-96ef-bc0ff35e7dd3','HomePod mini','Smart speaker with amazing sound',99.99,'https://images.unsplash.com/photo-1617175581263-bc0f059cce33?auto=format&fit=crop&w=800&q=80','Electronics',25,'2024-12-11 01:25:02'),('be929fee-b75e-11ef-96ef-bc0ff35e7dd3','iMac 24\"','All-in-one desktop with M1 chip',1499.99,'https://images.unsplash.com/photo-1527443060795-0402a18106c2?auto=format&fit=crop&w=800&q=80','Electronics',20,'2024-12-11 01:25:02'),('be92a01b-b75e-11ef-96ef-bc0ff35e7dd3','iPhone 14 Pro','The latest iPhone with innovative features and powerful performance',999.99,'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80','Electronics',50,'2024-12-11 01:25:02'),('be92a04b-b75e-11ef-96ef-bc0ff35e7dd3','MacBook Air M2','13-inch Retina display, M2 chip, and all-day battery life',1299.99,'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80','Electronics',30,'2024-12-11 01:25:02'),('be92a116-b75e-11ef-96ef-bc0ff35e7dd3','AirPods Pro','Active noise cancellation for immersive sound',249.99,'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&w=800&q=80','Electronics',100,'2024-12-11 01:25:02'),('be92a20b-b75e-11ef-96ef-bc0ff35e7dd3','iPad Air','10.9-inch Liquid Retina display with True Tone',599.99,'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80','Electronics',45,'2024-12-11 01:25:02'),('be92a251-b75e-11ef-96ef-bc0ff35e7dd3','Apple Watch Series 8','Advanced health features and powerful fitness tracking',399.99,'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80','Electronics',60,'2024-12-11 01:25:02'),('be92a281-b75e-11ef-96ef-bc0ff35e7dd3','Magic Keyboard','Wireless keyboard with numeric keypad',129.99,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80','Accessories',80,'2024-12-11 01:25:02'),('be92a2af-b75e-11ef-96ef-bc0ff35e7dd3','Magic Mouse','Wireless mouse with Multi-Touch surface',79.99,'https://images.unsplash.com/photo-1615750173609-2fbf12fd1d67?auto=format&fit=crop&w=800&q=80','Accessories',70,'2024-12-11 01:25:02'),('be92a300-b75e-11ef-96ef-bc0ff35e7dd3','Apple Pencil','Pixel-perfect precision for creative work',129.99,'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80','Accessories',40,'2024-12-11 01:25:02'),('be92a32f-b75e-11ef-96ef-bc0ff35e7dd3','MagSafe Charger','Wireless charging for iPhone',39.99,'https://images.unsplash.com/photo-1600490722773-35753aea6332?auto=format&fit=crop&w=800&q=80','Accessories',150,'2024-12-11 01:25:02'),('be92a37a-b75e-11ef-96ef-bc0ff35e7dd3','AirTag','Keep track of your everyday items',29.99,'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&w=800&q=80','Accessories',200,'2024-12-11 01:25:02'),('be92a3a8-b75e-11ef-96ef-bc0ff35e7dd3','HomePod mini','Smart speaker with amazing sound',99.99,'https://images.unsplash.com/photo-1617175581263-bc0f059cce33?auto=format&fit=crop&w=800&q=80','Electronics',25,'2024-12-11 01:25:02'),('be92a3d4-b75e-11ef-96ef-bc0ff35e7dd3','iMac 24\"','All-in-one desktop with M1 chip',1499.99,'https://images.unsplash.com/photo-1527443060795-0402a18106c2?auto=format&fit=crop&w=800&q=80','Electronics',20,'2024-12-11 01:25:02'),('be92a402-b75e-11ef-96ef-bc0ff35e7dd3','iPhone 14 Pro','The latest iPhone with innovative features and powerful performance',999.99,'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80','Electronics',50,'2024-12-11 01:25:02'),('be92a42e-b75e-11ef-96ef-bc0ff35e7dd3','MacBook Air M2','13-inch Retina display, M2 chip, and all-day battery life',1299.99,'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80','Electronics',30,'2024-12-11 01:25:02'),('be92a45b-b75e-11ef-96ef-bc0ff35e7dd3','AirPods Pro','Active noise cancellation for immersive sound',249.99,'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&w=800&q=80','Electronics',100,'2024-12-11 01:25:02'),('be92a48f-b75e-11ef-96ef-bc0ff35e7dd3','iPad Air','10.9-inch Liquid Retina display with True Tone',599.99,'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80','Electronics',45,'2024-12-11 01:25:02'),('be92a4bc-b75e-11ef-96ef-bc0ff35e7dd3','Apple Watch Series 8','Advanced health features and powerful fitness tracking',399.99,'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80','Electronics',60,'2024-12-11 01:25:02'),('be92a505-b75e-11ef-96ef-bc0ff35e7dd3','Magic Keyboard','Wireless keyboard with numeric keypad',129.99,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80','Accessories',80,'2024-12-11 01:25:02'),('be92a533-b75e-11ef-96ef-bc0ff35e7dd3','Magic Mouse','Wireless mouse with Multi-Touch surface',79.99,'https://images.unsplash.com/photo-1615750173609-2fbf12fd1d67?auto=format&fit=crop&w=800&q=80','Accessories',70,'2024-12-11 01:25:02'),('be92a560-b75e-11ef-96ef-bc0ff35e7dd3','Apple Pencil','Pixel-perfect precision for creative work',129.99,'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80','Accessories',40,'2024-12-11 01:25:02'),('be92a58d-b75e-11ef-96ef-bc0ff35e7dd3','MagSafe Charger','Wireless charging for iPhone',39.99,'https://images.unsplash.com/photo-1600490722773-35753aea6332?auto=format&fit=crop&w=800&q=80','Accessories',150,'2024-12-11 01:25:02'),('be92a60f-b75e-11ef-96ef-bc0ff35e7dd3','AirTag','Keep track of your everyday items',29.99,'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&w=800&q=80','Accessories',200,'2024-12-11 01:25:02'),('be92a640-b75e-11ef-96ef-bc0ff35e7dd3','HomePod mini','Smart speaker with amazing sound',99.99,'https://images.unsplash.com/photo-1617175581263-bc0f059cce33?auto=format&fit=crop&w=800&q=80','Electronics',25,'2024-12-11 01:25:02'),('be92a66d-b75e-11ef-96ef-bc0ff35e7dd3','iMac 24\"','All-in-one desktop with M1 chip',1499.99,'https://images.unsplash.com/photo-1527443060795-0402a18106c2?auto=format&fit=crop&w=800&q=80','Electronics',20,'2024-12-11 01:25:02'),('be92a698-b75e-11ef-96ef-bc0ff35e7dd3','iPhone 14 Pro','The latest iPhone with innovative features and powerful performance',999.99,'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80','Electronics',50,'2024-12-11 01:25:02'),('be92a6c3-b75e-11ef-96ef-bc0ff35e7dd3','MacBook Air M2','13-inch Retina display, M2 chip, and all-day battery life',1299.99,'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80','Electronics',30,'2024-12-11 01:25:02'),('be92a8ba-b75e-11ef-96ef-bc0ff35e7dd3','AirPods Pro','Active noise cancellation for immersive sound',249.99,'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&w=800&q=80','Electronics',100,'2024-12-11 01:25:02'),('be92a8f2-b75e-11ef-96ef-bc0ff35e7dd3','iPad Air','10.9-inch Liquid Retina display with True Tone',599.99,'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80','Electronics',45,'2024-12-11 01:25:02'),('be92a92d-b75e-11ef-96ef-bc0ff35e7dd3','Apple Watch Series 8','Advanced health features and powerful fitness tracking',399.99,'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80','Electronics',60,'2024-12-11 01:25:02'),('be92a959-b75e-11ef-96ef-bc0ff35e7dd3','Magic Keyboard','Wireless keyboard with numeric keypad',129.99,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80','Accessories',80,'2024-12-11 01:25:02'),('be92a986-b75e-11ef-96ef-bc0ff35e7dd3','Magic Mouse','Wireless mouse with Multi-Touch surface',79.99,'https://images.unsplash.com/photo-1615750173609-2fbf12fd1d67?auto=format&fit=crop&w=800&q=80','Accessories',70,'2024-12-11 01:25:02'),('be92a9b3-b75e-11ef-96ef-bc0ff35e7dd3','Apple Pencil','Pixel-perfect precision for creative work',129.99,'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80','Accessories',40,'2024-12-11 01:25:02'),('be92a9de-b75e-11ef-96ef-bc0ff35e7dd3','MagSafe Charger','Wireless charging for iPhone',39.99,'https://images.unsplash.com/photo-1600490722773-35753aea6332?auto=format&fit=crop&w=800&q=80','Accessories',150,'2024-12-11 01:25:02'),('be92aa08-b75e-11ef-96ef-bc0ff35e7dd3','AirTag','Keep track of your everyday items',29.99,'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&w=800&q=80','Accessories',200,'2024-12-11 01:25:02'),('be92aa36-b75e-11ef-96ef-bc0ff35e7dd3','HomePod mini','Smart speaker with amazing sound',99.99,'https://images.unsplash.com/photo-1617175581263-bc0f059cce33?auto=format&fit=crop&w=800&q=80','Electronics',25,'2024-12-11 01:25:02'),('be92aa66-b75e-11ef-96ef-bc0ff35e7dd3','iMac 24\"','All-in-one desktop with M1 chip',1499.99,'https://images.unsplash.com/photo-1527443060795-0402a18106c2?auto=format&fit=crop&w=800&q=80','Electronics',20,'2024-12-11 01:25:02');
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `productId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `rating` int NOT NULL,
  `comment` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `one_review_per_product` (`userId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
INSERT INTO `reviews` VALUES ('14214836-b8c7-11ef-9202-bc0ff35e7dd3','be92a45b-b75e-11ef-96ef-bc0ff35e7dd3','7f2abced-b82c-11ef-aa04-bc0ff35e7dd3',4,'qwrwqr','2024-12-12 20:24:24'),('49084680-b8c7-11ef-9202-bc0ff35e7dd3','be929f8d-b75e-11ef-96ef-bc0ff35e7dd3','7f2abced-b82c-11ef-aa04-bc0ff35e7dd3',2,'1231231','2024-12-12 20:25:53');
UNLOCK TABLES;



