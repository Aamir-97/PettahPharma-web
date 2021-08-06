-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2021 at 12:08 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pettahpharma`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `name` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`name`, `email`, `password`) VALUES
('Madhusha', 'madhusha@gmail.com', 'madhu123');

-- --------------------------------------------------------

--
-- Table structure for table `leavetype`
--

CREATE TABLE `leavetype` (
  `name` varchar(40) NOT NULL,
  `status` varchar(25) NOT NULL,
  `quota` int(25) NOT NULL,
  `frequency` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leavetype`
--

INSERT INTO `leavetype` (`name`, `status`, `quota`, `frequency`) VALUES
('', '', 0, ''),
('Medical', 'Paid', 3, 'Monthly'),
('Personal', 'Unpaid', 3, 'Monthly');

-- --------------------------------------------------------

--
-- Table structure for table `medicalrep`
--

CREATE TABLE `medicalrep` (
  `rep_ID` int(25) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `area` varchar(25) NOT NULL,
  `level` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `manager_ID` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicalrep`
--

INSERT INTO `medicalrep` (`rep_ID`, `name`, `email`, `phone_no`, `area`, `level`, `password`, `manager_ID`) VALUES
(1, 'Dhiga', 'dhiga@gmail.com', '0778844556', 'Dehiwala', 'A', 'dhiga', 2);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_ID` int(25) NOT NULL,
  `name` varchar(40) NOT NULL,
  `quantity` int(25) NOT NULL,
  `price` int(25) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_ID`, `name`, `quantity`, `price`, `description`) VALUES
(1, 'Panadol', 150, 10, 'Used for Fever, Headache'),
(2, 'Amoxicillin', 100, 25, 'Used as antibiotic'),
(3, 'Metformin', 150, 20, 'Used for type 2 diabetes');

-- --------------------------------------------------------

--
-- Table structure for table `salesmanager`
--

CREATE TABLE `salesmanager` (
  `manager_ID` int(25) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `area` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salesmanager`
--

INSERT INTO `salesmanager` (`manager_ID`, `name`, `email`, `phone_no`, `area`, `password`) VALUES
(1, 'Aamir', 'msaaamirali123@gmail.com', '0768921288', 'Maruthamunai', 'Dhiga'),
(2, 'Madhu', 'madhu@gmail.com', '0769131669', 'Kalmunai', 'madhu'),
(3, 'Thulasi', 'thulasi@gmail.com', '0761122334', 'Jaffna', 'thulasi123'),
(4, 'Dini', 'dini@gmail.com', '0769131119', 'Colombo', 'dini'),
(5, 'Juz', 'juz@gmail.com', '0778844521', 'Kattankudy', 'Juz'),
(6, 'Nimni', 'nimni@gmail.com', '0774411256', 'Galle', 'nimni');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leavetype`
--
ALTER TABLE `leavetype`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `medicalrep`
--
ALTER TABLE `medicalrep`
  ADD PRIMARY KEY (`rep_ID`),
  ADD KEY `f.key1` (`manager_ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_ID`);

--
-- Indexes for table `salesmanager`
--
ALTER TABLE `salesmanager`
  ADD PRIMARY KEY (`manager_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicalrep`
--
ALTER TABLE `medicalrep`
  ADD CONSTRAINT `f.key1` FOREIGN KEY (`manager_ID`) REFERENCES `salesmanager` (`manager_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
