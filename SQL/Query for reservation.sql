set search_path = "projet";

SELECT r.*, h.nom_hotel, c.ID_hotel
FROM Reservation r
INNER JOIN Chambre c ON r.num_chambre = c.num_chambre
INNER JOIN Hotel h ON c.ID_hotel = h.ID_Hotel;