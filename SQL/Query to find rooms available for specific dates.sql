set search_path = "projet";

SELECT h.ID_Hotel, h.Nom_hotel, ch.num_chambre
FROM Hotel h
JOIN Chambre ch ON h.ID_Hotel = ch.ID_hotel
WHERE ch.Disponibilite = TRUE
AND NOT EXISTS (
    SELECT 1
    FROM Reservation r
    WHERE r.num_chambre = ch.num_chambre
    AND (
        (r.Date_Arrivee < '2024-04-06' AND r.Date_Depart > '2024-04-04')
        OR (('2024-04-04' BETWEEN r.Date_Arrivee AND r.Date_Depart) 
        OR ('2024-04-06' BETWEEN r.Date_Arrivee AND r.Date_Depart))
    )
)
ORDER BY h.ID_Hotel, ch.num_chambre;