SET search_path = "projet";

CREATE INDEX idx_reservation_date_arrivee_depart ON Reservation(date_arrivee, date_depart) WHERE statut = 'confirmed';

CREATE INDEX idx_location_date_arrivee_depart ON Location(date_arrivee, date_depart) WHERE statut = 'confirmed';

CREATE INDEX idx_client_id ON Client(NAS_client);

CREATE INDEX idx_chambre_hotel_id ON Chambre(ID_hotel);

CREATE INDEX idx_paiement_methode ON Paiement(methode_paiement);

