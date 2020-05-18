

CREATE TABLE `Cars` (
  `id` int(11) NOT NULL,
  `matricule` varchar(50) NOT NULL,
  `ncinprop` char(8) NOT NULL,
  `marque` varchar(50) NOT NULL,
  `couleur` varchar(50) NOT NULL,
  `prix` int(11) NOT NULL,
  `kilometrage` int(11) NOT NULL,
  `etat` char(1) NOT NULL,
  `image` varchar(100) NOT NULL
) 

-- --------------------------------------------------------

--
-- Structure de la table `Rents`
--

CREATE TABLE `Rents` (
  `id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ncin` varchar(8) NOT NULL,
  `ncinprop` char(8) NOT NULL,
  `matricule` varchar(50) NOT NULL,
  `prix` int(11) NOT NULL,
  `duree` int(11) NOT NULL,
  `date` date NOT NULL,
  `active` tinyint(1) NOT NULL
) 

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `access` char(1) NOT NULL,
  `ncin` varchar(8) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `daten` varchar(10) NOT NULL,
  `npermis` varchar(20) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `num_tel` varchar(8) NOT NULL,
  `image` varchar(200) NOT NULL,
  `imagencin` varchar(50) NOT NULL,
  `bgimage` varchar(100) NOT NULL,
  `joindate` varchar(40) DEFAULT NULL
) 

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Cars`
--
ALTER TABLE `Cars`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Rents`
--
ALTER TABLE `Rents`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Cars`
--
ALTER TABLE `Cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Rents`
--
ALTER TABLE `Rents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

