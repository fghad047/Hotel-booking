set search_path = "projet";

SELECT l.*, h.nom_hotel, c.ID_hotel
FROM Location l
INNER JOIN Chambre c ON l.num_chambre = c.num_chambre
INNER JOIN Hotel h ON c.ID_hotel = h.ID_Hotel;