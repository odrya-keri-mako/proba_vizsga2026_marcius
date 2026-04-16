-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 16. 20:29
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `keri_library`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `genre_id` int(10) UNSIGNED NOT NULL,
  `author` varchar(250) NOT NULL,
  `publicated` char(4) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `valid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`id`, `name`, `genre_id`, `author`, `publicated`, `description`, `created_at`, `modified_at`, `valid`) VALUES
(1, 'A Pál utcai fiúk', 2, 'Molnár Ferenc', '1907', 'Barátság, hűség és összetartás története egy grundért vívott küzdelemben.', '2026-03-17 21:30:19', NULL, 1),
(2, 'Egri csillagok', 7, 'Gárdonyi Géza', '1899', 'A török ostrom idején hősök és sorsok fonódnak össze Eger várának falai között.', '2026-03-17 21:30:19', NULL, 1),
(3, 'Az ember tragédiája', 1, 'Madách Imre', '1861', 'Filozofikus drámai költemény az emberi történelem nagy kérdéseiről.', '2026-03-17 21:30:19', NULL, 1),
(4, 'Légy jó mindhalálig', 2, 'Móricz Zsigmond', '1920', 'Egy diák szemén át látszik, milyen nehéz tisztességesnek maradni az életben.', '2026-03-17 21:30:19', NULL, 1),
(5, 'Micimackó', 3, 'A. A. Milne', '1926', 'Kedves mesék a Százholdas pagony lakóiról, barátságról és játékos kalandokról.', '2026-03-17 21:30:19', NULL, 1),
(6, 'A kis herceg', 3, 'Antoine de Saint-Exupéry', '1943', 'Mesés utazás bolygóról bolygóra, egyszerű mondatokban nagy igazságokkal.', '2026-03-17 21:30:19', NULL, 1),
(7, 'Harry Potter és a bölcsek köve', 4, 'J. K. Rowling', '1997', 'Egy különleges fiú megismeri a varázsvilágot, és elkezdődik a kaland a Roxfortban.', '2026-03-17 21:30:19', NULL, 1),
(8, 'A Hobbit', 4, 'J. R. R. Tolkien', '1937', 'Bilbó egy váratlan utazáson talál bátorságra, barátokra és egy titokzatos gyűrűre.', '2026-03-17 21:30:19', NULL, 1),
(9, 'Frankenstein', 4, 'Mary Shelley', '1818', 'Egy tudós teremtése életre kel, és kérdéseket vet fel felelősségről és emberségről.', '2026-03-17 21:30:19', NULL, 1),
(10, 'A Da Vinci-kód', 5, 'Dan Brown', '2003', 'Rejtélyek és kódok nyomán egy veszélyes összeesküvés bontakozik ki Európa szívében.', '2026-03-17 21:30:19', NULL, 1),
(11, 'A csendes páciens', 5, 'Alex Michaelides', '2019', 'Egy nő néma marad egy tragédia után, és egy terapeuta megszállottan keresi az okot.', '2026-03-17 21:30:19', NULL, 1),
(12, 'Gyilkosság az Orient expresszen', 5, 'Agatha Christie', '1934', 'Poirot egy vonaton rekedve old meg egy bűntényt, ahol mindenkinek lehet indítéka.', '2026-03-17 21:30:19', NULL, 1),
(13, 'Büszkeség és balítélet', 6, 'Jane Austen', '1813', 'Szellemes és érzelmes történet szerelemről, félreértésekről és társadalmi elvárásokról.', '2026-03-17 21:30:19', NULL, 1),
(14, 'A notebook', 6, 'Nicholas Sparks', '1996', 'Egy nagy szerelem emlékei kelnek életre, amikor a múlt és a jelen összefonódik.', '2026-03-17 21:30:19', NULL, 1),
(15, 'Anna Karenina', 6, 'Lev Tolsztoj', '1878', 'Szenvedély és társadalmi ítélet között őrlődő sorsok a 19. századi Oroszországban.', '2026-03-17 21:30:19', NULL, 1),
(16, 'Sapiens - Az emberiség rövid története', 8, 'Yuval Noah Harari', '2011', 'Közérthető áttekintés arról, hogyan lett a Homo sapiens a Föld meghatározó faja.', '2026-03-17 21:30:19', NULL, 1),
(17, 'A világegyetem rövid története', 8, 'Stephen Hawking', '1988', 'Bevezető a kozmológia nagy kérdéseibe: téridő, fekete lyukak és az univerzum eredete.', '2026-03-17 21:30:19', NULL, 1),
(18, 'Gondolkodj gyorsan, dönts lassan', 8, 'Daniel Kahneman', '2011', 'Hogyan hozunk döntéseket, és miért tévedünk gyakran? Két gondolkodási rendszer nyomában.', '2026-03-17 21:30:19', NULL, 1),
(19, 'Matematika 7. osztály', 9, 'Szerzői munkaközösség', '2020', 'Feladatok és magyarázatok arányosságra, egyenletekre, geometriára - gyakorlásra kihegyezve.', '2026-03-17 21:30:19', NULL, 1),
(20, 'Angol nyelvkönyv B1', 9, 'Szerzői munkaközösség', '2021', 'Középszintű nyelvtan, szókincs és kommunikációs feladatok iskolai használatra.', '2026-03-17 21:30:19', NULL, 1),
(21, 'Atomic Habits', 10, 'James Clear', '2018', 'Apró szokásokból nagy változás: gyakorlati módszerek a tartós fejlődéshez.', '2026-03-17 21:30:19', NULL, 1),
(22, 'Miért alszunk?', 10, 'Matthew Walker', '2017', 'Az alvás szerepe az egészségben, tanulásban és teljesítményben - közérthetően, kutatásokra építve.', '2026-03-17 21:30:19', NULL, 1),
(23, 'A pénzügyi intelligencia', 11, 'Robert T. Kiyosaki', '1997', 'Alap gondolatok pénzről, szemléletről és a személyes pénzügyek tudatosabb kezeléséről.', '2026-03-17 21:30:19', NULL, 1),
(24, 'A befektetés pszichológiája', 11, 'Morgan Housel', '2020', 'Történetek és tanulságok arról, hogyan befolyásolja a viselkedés a pénzügyi döntéseinket.', '2026-03-17 21:30:19', NULL, 1),
(25, 'A művészet története', 12, 'E. H. Gombrich', '1950', 'Átfogó, mégis olvasmányos bevezető a képzőművészet nagy korszakaiba és stílusaiba.', '2026-03-17 21:30:19', NULL, 1),
(26, 'Művészet - Alapok', 12, 'Szerzői munkaközösség', '2019', 'Rajzi és vizuális alapismeretek: kompozíció, színek, formák és technikák rövid összefoglalóval.', '2026-03-17 21:30:19', NULL, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--

CREATE TABLE `genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Szépirodalom'),
(2, 'Ifjúsági'),
(3, 'Gyermekkönyv'),
(4, 'Sci-fi'),
(5, 'Thriller'),
(6, 'Romantikus'),
(7, 'Történelmi'),
(8, 'Ismeretterjesztő'),
(9, 'Tankönyv'),
(10, 'Életmód'),
(11, 'Gazdaság'),
(12, 'Művészet');


--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_book_genre` (`genre_id`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_book_genre` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
