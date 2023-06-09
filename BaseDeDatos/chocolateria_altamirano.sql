-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 23-06-2023 a las 20:10:35
-- Versión del servidor: 5.7.39
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chocolateria_altamirano`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `pregunta` text NOT NULL,
  `respuesta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `faqs`
--

INSERT INTO `faqs` (`id`, `pregunta`, `respuesta`) VALUES
(1, '¿Realizan envíos a domicilio?', 'Por el momento no, solo retiro por nuestro local.'),
(2, '¿Cómo puedo abonar?', 'Aceptamos efectivo, transferencias, todas las tarjetas de crédito, débito y MercadoPago.'),
(3, '¿Hay descuento si compro en efectivo?', 'Si, tenemos un 10% de descuento si pagas en efectivo.'),
(4, '¿Realizan chocolates personalizados?\r\n', 'Si, claro. Acercanos tu idea y lo diseñamos juntos.'),
(5, '¿Tienen productos sin TACC?', 'Si, tenemos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `novedad` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `novedad`) VALUES
(1, '¡Estamos contratando!', 'Si te interesa trabajar con nosotrosm acercanos tu CV a nuestra sucursal.'),
(3, '¡Nueva sucursal!', 'Pronto abriremos una nueva sucursal en el Tortugas Open Mall.'),
(8, 'Novedad de prueba 1234', 'esta es una novedad de prueba 1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `precio` int(50) NOT NULL,
  `img_id` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `promociones`
--

INSERT INTO `promociones` (`id`, `titulo`, `descripcion`, `precio`, `img_id`) VALUES
(1, 'Promo personalizados', 'Caja de bombones personalizados', 850, NULL),
(9, 'Promo Test', 'promo de prueba', 2500, 'w6ce7zj30r6a22gueg3i');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
