# Hotel-booking
Project Overview

Hotello is a web application designed to manage reservations, clients, employees, and other operations of a hotel chain. The system utilizes PostgreSQL for database management, and the web application frontend is developed using Node.js, Express.js, EJS, JavaScript, and CSS.

Technologies Used

Database Management System: PostgreSQL
Programming Languages: JavaScript, EJS, CSS
Backend Framework: Node.js, Express.js
Modules:
- pg for PostgreSQL communication
- body-parser for parsing incoming requests


Installation

Prerequisites
PostgreSQL
Node.js
Visual Studio Code or any preferred IDE


Steps for Installation
Database Setup

1. Create a new PostgreSQL database named projet.
2. Create a schema named projet in this database.
3. Set the new schema as the default schema by executing:
SET search_path = 'projet';

4. Integrate the following SQL files in the specified order:
- Schemas.sql
- Constraints.sql
- Data.sql
- Triggers.sql
- Indexes.sql
- Views.sql

Web Application Setup

1. Download and unzip the projetSQL2 file.
2. Open the project in Visual Studio Code or your preferred IDE.
3. Open the index.js file and assign a port number to the constant PORT if port 3232 is already in use.
4. If you have modified the default port for PostgreSQL, specify it under the client object in the port attribute.
5. Enter your PostgreSQL password in the password attribute of the client object.
6. Ensure Node.js is installed.
7. Open a terminal in your IDE, navigate to the project directory, and run:
 npm install
8. Start the application by running:
node index.js
9.Open a browser and go to http://localhost:3232, replacing 3232 with your assigned port if different.

Usage

To use the application:

1. Open a browser and navigate to http://localhost:3232.
2. Log in using a customer or admin account. Existing accounts can be found using the query:
