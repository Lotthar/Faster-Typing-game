-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2019 at 10:33 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fasttyping`
--

-- --------------------------------------------------------

--
-- Table structure for table `takmicar`
--

CREATE TABLE `takmicar` (
  `id` int(11) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `rezultat` int(11) DEFAULT NULL,
  `vrijeme` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `takmicar`
--

INSERT INTO `takmicar` (`id`, `ime`, `rezultat`, `vrijeme`) VALUES
(320, 'branko', 86, '30 sec'),
(321, 'tijana', 70, '90 sec'),
(323, 'Mirko', 179, '60 sec'),
(324, 'Lothar', 143, '60 sec'),
(325, 'Jankoo', 41, '30 sec'),
(326, 'Lothar', 143, '60 sec'),
(327, 'Lothar', 235, '90 sec'),
(328, 'Tijana', 74, '30 sec'),
(329, 'Lothar', 162, '60 sec'),
(330, 'Lothar', 188, '90 sec'),
(331, 'Petar', 59, '30 sec'),
(332, 'brankoU', 67, '30 sec'),
(333, 'Kosta', 0, '30 sec'),
(334, 'Branko', 68, '30 sec');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `takmicar`
--
ALTER TABLE `takmicar`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `takmicar`
--
ALTER TABLE `takmicar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=335;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
