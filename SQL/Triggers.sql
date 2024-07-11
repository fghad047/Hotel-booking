SET search_path = "projet";


CREATE OR REPLACE FUNCTION update_nombre_chambres_disponibles()
RETURNS TRIGGER AS $$
DECLARE 
    hotel_id INT;
BEGIN
    SELECT id_hotel INTO hotel_id FROM Chambre WHERE num_chambre = NEW.num_chambre LIMIT 1;

    IF hotel_id IS NOT NULL THEN
        UPDATE Hotel 
        SET nombre_chambre = nombre_chambre - 1
        WHERE id_hotel = hotel_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_nombre_chambres_disponibles
AFTER INSERT ON Reservation
FOR EACH ROW
EXECUTE FUNCTION update_nombre_chambres_disponibles();



CREATE OR REPLACE FUNCTION restore_nombre_chambres_disponibles()
RETURNS TRIGGER AS $$
DECLARE 
    hotel_id INT;
BEGIN
    SELECT id_hotel INTO hotel_id FROM Chambre WHERE num_chambre = OLD.num_chambre LIMIT 1;

    IF hotel_id IS NOT NULL THEN
        UPDATE Hotel 
        SET nombre_chambre = nombre_chambre + 1
        WHERE id_hotel = hotel_id;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER restore_nombre_chambres_disponibles
AFTER DELETE ON Reservation
FOR EACH ROW
EXECUTE FUNCTION restore_nombre_chambres_disponibles();
