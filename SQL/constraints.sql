SET search_path = "projet";
 

ALTER TABLE Gestionnaire 
ADD CONSTRAINT CHK_FormatEmail_Gestionnaire CHECK (email LIKE '%_@_%._%'); 

ALTER TABLE ChaineHoteliere 
ADD CONSTRAINT CHK_FormatEmail_Chaine CHECK (email LIKE '%_@_%._%'); 

ALTER TABLE Hotel 
ADD CONSTRAINT CHK_FormatEmail_Hotel CHECK (email LIKE '%_@_%._%');

ALTER TABLE client 
ADD CONSTRAINT CHK_FormatEmail_client CHECK (email LIKE '%_@_%._%'); 


ALTER TABLE Client ADD CONSTRAINT CHK_FormatTelephone_Client CHECK (num_tel SIMILAR TO '(\+?\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}'); 

ALTER TABLE Employee ADD CONSTRAINT CHK_FormatTelephone_Employee CHECK (num_tel SIMILAR TO '(\+?\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}'); 

ALTER TABLE Gestionnaire ADD CONSTRAINT CHK_FormatTelephone_Gestionnaire CHECK (num_tel SIMILAR TO '(\+?\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}'); 

ALTER TABLE ChaineHoteliere ADD CONSTRAINT CHK_FormatTelephone_Chaine CHECK (num_tel SIMILAR TO '(\+?\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}'); 

ALTER TABLE Hotel ADD CONSTRAINT CHK_FormatTelephone_Hotel CHECK (num_tel SIMILAR TO '(\+?\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}'); 


ALTER TABLE Reservation ADD CONSTRAINT CHK_FormatDateArrivee CHECK (to_char(date_arrivee, 'YYYY-MM-DD') ~ '^\d{4}-\d{2}-\d{2}$');

ALTER TABLE Reservation ADD CONSTRAINT CHK_FormatDateDepart CHECK (to_char(date_depart, 'YYYY-MM-DD') ~ '^\d{4}-\d{2}-\d{2}$');

ALTER TABLE Location ADD CONSTRAINT CHK_FormatDateArrivee CHECK (to_char(date_arrivee, 'YYYY-MM-DD') ~ '^\d{4}-\d{2}-\d{2}$'); 

ALTER TABLE Location ADD CONSTRAINT CHK_FormatDateDepart CHECK (to_char(date_depart, 'YYYY-MM-DD') ~ '^\d{4}-\d{2}-\d{2}$'); 



ALTER TABLE paiement
ADD CONSTRAINT CHK_FormatCreditCardNumber
CHECK (credit_card_number ~ '^\d{4}-\d{4}-\d{4}-\d{4}$');

ALTER TABLE Hotel ADD CONSTRAINT CHK_RatingRange CHECK (nombre_etoile >= 1 AND nombre_etoile <= 5);



ALTER TABLE Client
ADD CONSTRAINT CHK_NAS_Client_Length CHECK (NAS_Client >= 100000000 AND NAS_Client <= 999999999);
ALTER TABLE Client 
ADD CONSTRAINT UNQ_NAS_Client_Unique UNIQUE (NAS_Client); 


ALTER TABLE Employee
ADD CONSTRAINT CHK_NAS_Employee_Length CHECK (NAS_employee >= 100000000 AND NAS_employee <= 999999999);
ALTER TABLE Employee 
ADD CONSTRAINT UNQ_NAS_Employee_Unique UNIQUE (NAS_employee); 


ALTER TABLE Client
ADD CONSTRAINT check_age CHECK (age >= 18);

ALTER TABLE Reservation 
ADD CONSTRAINT CHK_Reservation_Date CHECK (Date_Depart > Date_Arrivee); 

ALTER TABLE Location 
ADD CONSTRAINT CHK_Location_Date CHECK (Date_Depart > Date_Arrivee); 


ALTER TABLE Paiement 
ADD CONSTRAINT CHK_MethodePaiementValide CHECK (methode_paiement IN ('Mastercard', 'Visa')); 

ALTER TABLE Reservation ADD CONSTRAINT CHK_ReservationUnique UNIQUE (num_chambre, date_arrivee, date_depart); 



