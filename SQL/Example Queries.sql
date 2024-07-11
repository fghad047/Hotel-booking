SET search_path = "projet";

INSERT INTO Employee(nas_employee,id_role,nom,prenom,adresse,num_tel,nom_hotel)
 VALUES (800000000, 1001,'Marie','John','888 Forest Drive,Vancouver, British Columbia, Canada V5C 0E6','604-433-7890','Tranquil Oasis Hotel');
		 
INSERT INTO client(nas_client,nom,prenom,age,adresse,num_tel,date_enregistrement,email)
VALUES (993394444, 'James', 'Pierre', 34, '555 York Street, Toronto, ON, Canada M6J 4E3', '416-777-7990',CURRENT_DATE, 'james.pierre@contact.com');

INSERT INTO reservation(id_reservation,num_chambre,nas_client,date_reservation,date_arrivee,date_depart,statut)
VALUES
   (02,27,993394444,'2024-04-18','2024-04-19','2024-04-23','pending');
   
DELETE FROM Reservation WHERE id_reservation = 456; 

UPDATE Hotel SET nombre_etoile = 5 WHERE id_hotel = 123;

UPDATE Client SET adresse = '222 Willow Way, Vancouver, British Columbia, Canada V5B 8E9' WHERE NAS_client = 999911111;


