-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-03-2025 a las 01:02:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `finca_cafetera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` int(6) NOT NULL,
  `nombre_actividad` varchar(250) NOT NULL,
  `nombre_realizador` varchar(250) NOT NULL,
  `jornales` int(3) NOT NULL,
  `insumo_utilizado` varchar(250) NOT NULL,
  `fecha_realizacion` date NOT NULL,
  `costo_total` int(7) NOT NULL,
  `observaciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id`, `nombre_actividad`, `nombre_realizador`, `jornales`, `insumo_utilizado`, `fecha_realizacion`, `costo_total`, `observaciones`) VALUES
(1, 'guadañar', 'juan', 1, 'guadaña', '2025-03-24', 50000, 'dcssvfv'),
(2, 'recolecion de cafe', 'jesus', 3, 'coco  estopas', '2025-03-24', 60000, 'f3g434');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_financieros`
--

CREATE TABLE `datos_financieros` (
  `id` int(6) NOT NULL,
  `mes` varchar(56) DEFAULT NULL,
  `semana` int(11) DEFAULT NULL,
  `ingresos` int(11) DEFAULT NULL,
  `gastos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos_financieros`
--

INSERT INTO `datos_financieros` (`id`, `mes`, `semana`, `ingresos`, `gastos`) VALUES
(1, 'enero', 1, 456500, 310000),
(2, 'enero', 2, 50000, 100000),
(3, 'enero', 3, 640000, 300000),
(4, 'enero', 4, 10000, 50000),
(5, 'febrero', 1, 328900, 123490),
(6, 'febrero', 2, 560000, 234567),
(7, 'febrero', 3, 345689, 412300),
(8, 'febrero', 4, 298490, 208900);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id` int(6) NOT NULL,
  `tipo` varchar(250) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `codigo_asignado` varchar(70) NOT NULL,
  `fecha_compra` date NOT NULL,
  `ubicacion` varchar(250) NOT NULL,
  `cantidad` int(6) NOT NULL,
  `observaciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id`, `tipo`, `nombre`, `codigo_asignado`, `fecha_compra`, `ubicacion`, `cantidad`, `observaciones`) VALUES
(1, 'herramienta', 'guadaña', 'di22bb2', '2025-03-12', 'terreno', 2, 'rgeve'),
(3, 'herramienta', 'asadon', 'as202201', '2023-03-14', 'almacen', 1, 'se compro en ferreteria andina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `id` int(6) NOT NULL,
  `nombre_lote` varchar(250) NOT NULL,
  `area_lote` int(6) NOT NULL,
  `tipo_cultivo` varchar(250) NOT NULL,
  `variedad` varchar(250) NOT NULL,
  `densidad_siembra` int(5) NOT NULL,
  `fecha_siembra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lotes`
--

INSERT INTO `lotes` (`id`, `nombre_lote`, `area_lote`, `tipo_cultivo`, `variedad`, `densidad_siembra`, `fecha_siembra`) VALUES
(2, 'guayabo ', 2500, 'platano', 'catimore', 1840, '2020-07-19'),
(5, 'yarumo', 5000, 'cafe', 'cenicafe', 1500, '2022-08-19'),
(6, 'guamo', 2000, 'cafe', 'castillo', 220, '2022-08-19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `datos_financieros`
--
ALTER TABLE `datos_financieros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `datos_financieros`
--
ALTER TABLE `datos_financieros`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
