SET search_path = "projet";

--Vue 1: Nombre de chambres disponibles par zone
--Cette vue donnera le nombre de chambres disponibles dans chaque hôtel, groupées par zone.
CREATE OR REPLACE VIEW chambres_disponibles_par_zone AS
SELECT H.Adresse AS Zone, 
       H.Nom_hotel,
       H.Nombre_chambre AS Nombre_Chambres_Disponibles
FROM Hotel H
WHERE EXISTS (
    SELECT 1
    FROM Chambre C
    WHERE H.ID_Hotel = C.ID_hotel
    AND C.Disponibilite = TRUE
);

--Vue 2: Capacité de toutes les chambres d'un hôtel spécifique
CREATE OR REPLACE VIEW capacite_par_chambre_par_hotel AS
SELECT C.num_chambre, 
       C.Capacite, 
       H.Nom_hotel
FROM Chambre C
INNER JOIN Hotel H ON C.ID_hotel = H.ID_Hotel;


