SET search_path TO "projet";

CREATE TABLE Role( 
ID_role INTEGER,
Nom_role VARCHAR(100), 
Description VARCHAR(255), 
Salaire INTEGER, 
PRIMARY KEY (ID_role)); 

CREATE TABLE Gestionnaire( 
ID_gestionnaire INTEGER,
Nom VARCHAR(100), 
Prenom VARCHAR(100), 
Nom_hotel VARCHAR(100), 
Adresse VARCHAR(100), 
Email VARCHAR(100), 
Num_tel VARCHAR(100), 
PRIMARY KEY (ID_gestionnaire)); 

CREATE TABLE ChaineHoteliere( 
ID_chaine INTEGER,
Nom_chaine VARCHAR(100), 
Adresse VARCHAR(100), 
Nombre_hotel INTEGER, 
Email VARCHAR(100), 
Num_tel VARCHAR(100),
PRIMARY KEY (ID_chaine)); 

CREATE TABLE Hotel( 
ID_Hotel INTEGER,
ID_chaine INTEGER,
Nom_hotel VARCHAR(100), 
Nombre_chambre INTEGER, 
Adresse VARCHAR(100), 
Num_tel VARCHAR(100), 
Nombre_etoile INTEGER, 
Email VARCHAR(100), 
Categorie VARCHAR(100), 
Nom_chaine VARCHAR(100), 
Description VARCHAR(255), 
PRIMARY KEY (ID_Hotel), 
FOREIGN KEY (ID_chaine) REFERENCES ChaineHoteliere);

CREATE TABLE Employee( 
NAS_employee INTEGER,
ID_role INTEGER,
Nom VARCHAR(100), 
Prenom VARCHAR(100), 
Adresse VARCHAR(100), 
Num_tel VARCHAR(100), 
Nom_hotel VARCHAR(100), 
PRIMARY KEY (NAS_employee), 
FOREIGN KEY (ID_role) REFERENCES Role); 

CREATE TABLE Client( 
NAS_client INTEGER,
Nom VARCHAR(100), 
Prenom VARCHAR(100), 
Age INTEGER, 
Adresse VARCHAR(100), 
Num_tel VARCHAR(100), 
Date_enregistrement DATE, 
email VARCHAR(100),
PRIMARY KEY (NAS_client)); 

CREATE TABLE Chambre( 
num_chambre INTEGER,
ID_hotel INTEGER,
Prix Numeric(10,2), 
Commodites VARCHAR(100), 
Capacite INTEGER, 
Vue VARCHAR(100), 
Extensible BOOLEAN, 
Problemes BOOLEAN, 
Disponibilite BOOLEAN, 
Superficie_m2 VARCHAR(100), 
Description VARCHAR(255), 
Nom_hotel VARCHAR(100), 
PRIMARY KEY (num_chambre), 
FOREIGN KEY (ID_hotel) REFERENCES Hotel);

CREATE TABLE Reservation( 
ID_reservation INTEGER,
num_chambre INTEGER,
NAS_client INTEGER,
Date_reservation DATE, 
Date_arrivee DATE, 
Date_depart DATE, 
Statut VARCHAR(100), 
PRIMARY KEY (ID_reservation), 
FOREIGN KEY (num_chambre) REFERENCES Chambre, 
FOREIGN KEY (NAS_client) REFERENCES Client); 

CREATE TABLE Location( 
ID_location INTEGER,
num_chambre INTEGER,
NAS_client INTEGER,
NAS_employee INTEGER,	
Date_location DATE, 
Date_arrivee DATE, 
Date_depart DATE, 
Statut VARCHAR(100), 
PRIMARY KEY (ID_location), 
FOREIGN KEY (num_chambre) REFERENCES Chambre, 
FOREIGN KEY (NAS_client) REFERENCES Client,
FOREIGN KEY (NAS_employee) REFERENCES Employee); 

CREATE TABLE Paiement( 
ID_paiement INTEGER,
ID_location INTEGER,
Montant NUMERIC(10,2), 
Date_paiement DATE, 
Methode_paiement VARCHAR(100), 
Credit_card_number VARCHAR(20), 
PRIMARY KEY (ID_paiement), 
FOREIGN KEY (ID_location) REFERENCES Location);

CREATE TABLE Utilisateur(
    email VARCHAR(100),
    password VARCHAR(100),
    userType VARCHAR(100),
    PRIMARY KEY (email));

