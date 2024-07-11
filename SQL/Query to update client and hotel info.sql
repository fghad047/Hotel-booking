SET search_path = "projet";

UPDATE Client
SET nom = 'new name', prenom = 'new surname', adresse = 'new address'
WHERE NAS_client = 'Client_NAS';

UPDATE Hotel
SET nom_hotel = 'new hotel name', adresse = 'new hotel address', nombre_etoile = 'newStarRating'
WHERE ID_Hotel = 'Hotel_ID';
