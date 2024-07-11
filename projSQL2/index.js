import express from "express";
import pkg from 'pg';
import bodyParser from "body-parser";
const { Client } = pkg;
const PORT = 3232; 
var userIsAuth = false;
var userType = "";
var username = "";

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "projet"

})

client.connect();


let hotels = [];
let rooms = [];
let hotelInfo = [];
let reservations = [];
let clients = [];


client.query(`Select * from projet.hotel`, (err, res) =>{
    if(!err){
        // console.log(res.rows)
        let rows = res.rows;
        for (let i = 0 ; i < rows.length ; i++){
            var row = rows[i];
            hotels.push(row);
        }
    }
    else {
        console.log(err.message);
    }
    client.end;
})

client.query(`Select * from projet.chambre`, (err, res) =>{
    if(!err){
        let rows = res.rows;
        for (let i = 0 ; i < rows.length ; i++){
            var row = rows[i];
            rooms.push(row);
        }
    }
    else {
        console.log(err.message);
    }
    client.end;
})

client.query(`SELECT * from projet.client`, (err, res) =>{
    if(!err){
        let rows = res.rows;
        for (let i = 0 ; i < rows.length ; i++){
            var row = rows[i];
            clients.push(row);
        }
    }
    else {
        console.log(err.message);
    }
    client.end;
})


client.query(`SELECT r.*, h.nom_hotel, c.ID_hotel
FROM projet.Reservation r
INNER JOIN projet.Chambre c ON r.num_chambre = c.num_chambre
INNER JOIN projet.Hotel h ON c.ID_hotel = h.ID_Hotel`, (err, res) =>{
    if(!err){
        let rows = res.rows;
        // console.log(rows);
        for (let i = 0 ; i < rows.length ; i++){
            var row = rows[i];
            reservations.push(row);
        }
    }
    else {
        console.log(err.message);
    }
    client.end;
})

const app = express();

// app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

// app.get("/", (req, res) => {
// if(userType === "client"){
// res.render("index.ejs", {hotels:hotels, rooms:rooms});
// } else {
//     res.send("hehe");
// }

// });

app.get("/", (req, res) => {
    if(!userIsAuth){
    res.render("login.ejs")}
    else {
        if(userType === "client"){res.render("index.ejs", {hotels:hotels, rooms:rooms});}
        if(userType === "admin"){res.render("adminDash.ejs", {hotelInfo: hotelInfo, reservations:reservations, clients:clients});}
        
    }
    });

app.post("/login", async (req,res) => {
    let usernameEntered = req.body['username'];
    let passEntered = req.body['password'];

    try {
        const result = await client.query("SELECT * from projet.utilisateur WHERE email = $1",[
            usernameEntered,
        ]);

        if(result.rows.length > 0){
            const user = result.rows[0];
            const savedPassword = user.password;
            const savedType = user.usertype;
            const savedUser = user.email;
            
            if (passEntered === savedPassword) {
                

                if (savedType === "client") {
                    userIsAuth = true;
                    userType = savedType;
                    username = savedUser.toLowerCase().trim();
                    res.render("index.ejs", {hotels:hotels, rooms:rooms});
                } 
                else
                { 
            userIsAuth = true;
            userType = savedType;
            username = savedUser.toLowerCase().trim();
            for(let i = 0; i < hotels.length ; i++){
                if (hotels[i]['email'] === username){
                    hotelInfo.push(hotels[i]);
                };
            }

            // try {
            //     var hotelID = hotelInfo[0].id_hotel.trim();
            //     var hotelName = hotelInfo[0].nom_hotel.trim();

            //     const reservationList = await client.query("SELECT * from projet.reservation");
            //     console.log(reservationList.rows);
            //     console.log(hotelInfo[0].id_hotel);
                
            // } catch (error) {
            //     console.log(error);
                
            // }
            res.redirect("/");

            //unccc
            // res.render ("adminDash.ejs" , {hotelInfo: hotelInfo, reservations:reservations});
            }
                
            }
            else
            { res.send("Incorrect password")
        }
        }
        else
        {res.send("User not found");
    }
        
        
    } catch (error) {
        console.log(err);
        
    }

    // client.query(`Select * from projet.utilisateur`, (err, res) =>{
    //     if(!err){
    //         let userInput =  ""; 
    //         let rows = res.rows;
    //         let usernameEntered = req.body['username'];
    //         let passEntered = req.body['password'];

    //         for (let i = 0 ; i < rows.length ; i++){
    //             if((rows[i]['email']).toLowerCase().trim() == usernameEntered.toLowerCase().trim()){
    //                 if((rows[i]['password']).trim() == passEntered.trim()){
    //                     userInput = (rows[i]['usertype']).toLowerCase().trim();
    //                     var userT = userInput;
                        
    //                     userType.push(userT);


    //                 }
    //             }
    //         }
    //     }
    //     else {
    //             console.log(err) ;
    //    }

    //     client.end;

    // })
    // console.log("usert: " + userType);



    // if (userType[0] === "client") {
    //     res.render("index.ejs", {hotels:hotels, rooms:rooms})
    // }
    // if(userType[0] === "admin")
    // {
    //     res.send("hehe");
    // }
    
    // else{
        
    //     res.send("<script> alert('Unable to process login'); </script>" );
        
    // }
});

app.get("/rooms", async (req, res) =>{

    if(!userIsAuth){
        res.render("login.ejs");

    } else {

    try {
        var hotel = "";
        hotel = hotelInfo[0].id_hotel;
        console.log(hotel);

        const rooms = await client.query("SELECT * from projet.chambre WHERE id_hotel = $1", [
                hotel,
        ]);

        const currentNumber = await client.query("SELECT max(num_chambre) from projet.chambre");

        var number = currentNumber.rows[0].max;
        var roomsList = rooms.rows;
        res.render("rooms.ejs", {roomsList:roomsList, number:number});

    } catch (error) {
        console.log("Cannot get hotel rooms." + hotel);
        
    }

    }

});

app.get("/employees", async (req, res) =>{

    if(!userIsAuth){
        res.render("login.ejs");

    } else {
       

        try {
            var hotelName = ""
           hotelName = hotelInfo[0].nom_hotel;


            const employees = await client.query("SELECT * from projet.employee WHERE nom_hotel = $1" , [
                hotelName,
            ]);

            const roles = await client.query("SELECT * from projet.role ");
            // if(employees.rows.length > 0){

                var employeeList = employees.rows;
                var rolesList = roles.rows;
               res.render("employees.ejs", {employeeList:employeeList, rolesList:rolesList});

            // }
            // res.render("employees.ejs", {employees:employees});

            
        } catch (error) {
            console.log("Error getting employees.");
            
        }

    }

});


app.get("/profile", async (req, res) => {

    if(!userIsAuth){

        res.render("login.ejs");
    }
        else {
            try {
                const result = await client.query("SELECT * from projet.client WHERE email = $1" ,[
                    username,
                ]);

                if(result.rows.length > 0){
                    var userinfo = result.rows[0];
                    res.render("userProfile.ejs", {userinfo:userinfo});
                }
               
                
            } catch (error) {
                console.log(res.send("Cannot launch profile"));
                
            }
           
            
            
        }
        });

    
app.post("/addHotel", (req,res) => {
    console.log(req.body);
});

app.post("/update-hotel" , (req,res) =>{
    var hotelname = req.body['hname'];
    var chain = req.body['cname'];
    var category = req.body['category'];
    var phone = req.body['phone number'];
    var desc = req.body['desc'];
    var hotel_id = req.body['hotel-id'];
    var addy = req.body['address'];

    try {
        client.query("UPDATE projet.hotel SET nom_hotel = $1, nom_chaine = $2 , categorie= $3 , num_tel= $4 , adresse = $5, description = $6 WHERE id_hotel = $7 ", [
            hotelname, chain, category, phone, addy, desc, hotel_id,
        ]);

    // hotels= []
    // console.log("step 1");
    // client.query(`Select * from projet.chambre`, (err, res) =>{
    //     if(!err){
    //          console.log(res.rows)
    //         let rows = res.rows;
    //         for (let i = 0 ; i < rows.length ; i++){
    //             var row = rows[i];
    //             rooms.push(row);
    //         }
    //     }
    //     else {
    //         console.log(err.message);
    //     }
    //     client.end;
    // })

    // console.log("step 2");  
    } catch (error) {
        console.log("Unable to update info")
        
    }

      
    //res.redirect ("/");

});

app.post("/update-client", (req,res) => {
    var NAS = req.body['user-nas'];
    var nom = req.body['lname'];
    var prenom = req.body['fname'];
    var tel = req.body['phone number'];
    var age = req.body['age'];
    var address = req.body['address']
    try {
        client.query("UPDATE projet.client SET nom = $1, prenom = $2 , age= $3 , num_tel= $4 , adresse = $5 WHERE nas_client = $6 ", [
            nom, prenom, age, tel, address, NAS,
        ]);

        
    } catch (error) {
        console.log("Unable to update info")
        
    }

});

app.post("/filter", async (req, res) => {
    if(req.body['from-date-output'] >= req.body['to-date-output']){
        res.send("Invalid input, make sure from date prior to end date");
    } else{
        let categoriesN = [];

        
             try {

                console.log(req.body);
        var from  = req.body['from-date-output'].trim();
        var to = req.body['to-date-output'].trim();

        if(req.body['area-output'] === ""){area = 0;} else{
        var area = req.body['area-output'].trim();}

        if(req.body['select-chain-output'] === "" ){
            var chain = [1,2,3,4,5];
            console.log("chain: " + chain);
        }else{
            var first= req.body['select-chain-output'].trim().toString();}
            let test = [];
            test.push(first);
            var chain = test;
        
        if(req.body['select-category-output'] == "none"  ){
            console.log("yes");
            categoriesN.push("suite");
            categoriesN.push("resort");
            categoriesN.push("luxury");
            // var category = ["suite","resort","luxury"];
            console.log("here" + categoriesN);
        } else{
        var cat = req.body['select-category-output'].trim().toString();}
        let second = [];
        second.push(cat);
        categoriesN= second;

            if(req.body['min-output'] == ""){
                var min = 0;
            }else {
        var min = req.body['min-output'].trim();
            }
            if(req.body['max-output'] == ""){
                var max = 0;
            } else {

        var max = req.body['max-output'].trim();
            }

            if(req.body['totalrooms'] == ""){
                var totalrooms = 0;
             } else {
                var totalrooms = req.body['totalrooms'].trim();
             }

                const queryRooms = await client.query(`SELECT  ch.Num_chambre, ch.id_hotel,
                ch.prix, ch.commodites, ch.capacite, ch.vue, 
                ch.extensible, ch.problemes, ch.disponibilite, 
                ch.superficie_m2, ch.description, ch.nom_hotel
                FROM projet.Hotel h
                JOIN projet.Chambre ch ON h.ID_Hotel = ch.ID_hotel
                
                WHERE ch.Disponibilite = TRUE
                AND ch.prix >= $6
                AND h.nombre_chambre >= $3
                AND categorie = ANY ($4)
                AND id_chaine = ANY ($5)
                AND ch.prix <= $7

                

                
                AND NOT EXISTS (
                    SELECT 1
                    FROM projet.Reservation r
                    WHERE r.num_chambre = ch.num_chambre
                    AND (
                        (r.Date_Arrivee < $1 AND r.Date_Depart > $2)
                        OR (($2 BETWEEN r.Date_Arrivee AND r.Date_Depart) 
                        OR ($1 BETWEEN r.Date_Arrivee AND r.Date_Depart))
                    )
                )
                ORDER BY h.ID_Hotel, ch.num_chambre;`, [
                    from, to, totalrooms, categoriesN, chain, min,max
                ]);

                console.log(from, to, totalrooms, chain, "cat: " , categoriesN, min, max,area);


                const rooms = queryRooms.rows;
                console.log(rooms.length);
                let newListHotels = [];


                for(let i = 0 ; i < hotels.length ; i++){
                    for(let j = 0; j < rooms.length; j++){
                        if(rooms[j].id_hotel === hotels[i].id_hotel && !newListHotels.includes(hotels[i])){
                                newListHotels.push(hotels[i]);
                        }
                    }
                }
                let dates = [];
                dates.push(from);
                dates.push(to);

                res.render("index.ejs", {hotels:newListHotels, rooms:rooms, dates:dates});
                
                
             } catch (error) {
                console.log(error);
                
             }
    }
    
    
// if(req.body['category-output'] === undefined){
//     console.log("nope");
//     category = "resort,luxury";
// } else {
//     category = req.body['category-output'];
//     console.log("did it");
// }

// console.log(category);

});

app.post("/addEmployee", (req,res) => {

    var nas = req.body['nas'];
    var role = req.body['role'];
    var fname = req.body['fname'];
    var lname = req.body['lname'];
    var num_tel = req.body['num_tel'];
    var adresse = req.body['adresse'];
    var hotel = hotelInfo[0].nom_hotel;

    try {
        client.query("INSERT INTO projet.employee VALUES ($1, $2, $3, $4, $5, $6, $7)", [
            nas, role, lname, fname,adresse, num_tel, hotel
        ]);
        
    } catch (error) {
        console.log("Cannot add employee.")
        
    }
    
    res.redirect("/employees");
});

app.post("/removeEmployee" , (req,res) => {
var nas = req.body['nas'].trim();
var hotel = hotelInfo[0].nom_hotel.trim();

try {
    client.query("DELETE FROM projet.employee WHERE nom_hotel= $1 AND nas_employee = $2", [
        hotel, nas
    ]);
    
} catch (error) {
    console.log("Unable to remove employee");
}

res.redirect("/employees");


});

app.post("/updateEmployee", (req,res) => {

    var nas = req.body['nas'].trim();
    var role = req.body['role'].trim();
    var fname = req.body['fname'].trim();
    var lname = req.body['lname'].trim();
    var num_tel = req.body['num_tel'].trim();
    var adress = req.body['adresse'].trim();
    var hotel = hotelInfo[0].nom_hotel.trim();



    try {
        client.query("UPDATE projet.employee SET id_role = $1, prenom = $2, nom = $3 , adresse = $4, num_tel = $5 WHERE nas_employee = $6 AND nom_hotel = $7", [
            role, fname, lname, adress, num_tel, nas, hotel,
        ]);
    } catch (error) {
        console.log("Unable to update employee info.")
    }

    res.redirect("/employees");

});

app.post("/updateRoom",  async (req,res) => {
// console.log(req.body);
var room_number = "";
room_number=  req.body['room'].trim();
var prix;
var capacity;
var vue;
var desc;
var disponibilite;
var extendable;
var problems;
 console.log(req.body);

let previousRoom = {};
let foundRoom = false;

for(let i = 0; i < rooms.length; i++){
  if(rooms[i]['num_chambre'] == room_number && rooms[i]['nom_hotel'] === hotelInfo[0].nom_hotel ){
    previousRoom = rooms[i];
    foundRoom = true;
  }
}

if(!foundRoom){
    res.send("Invalid room number");
}

if(req.body['capacity'] === ""){capacity = previousRoom['capacite']}else{
    capacity = req.body['capacity'];
};
if(req.body['view'] === ""){vue = previousRoom['vue']}else{
    vue = req.body['view'];
};
if(req.body['price'] === ""){prix = previousRoom['prix']}else{
    prix = req.body['price'];
};
if(req.body['desc'] === ""){desc = previousRoom['description']}else{
    desc = req.body['desc'];
};
if(req.body['availability'] === undefined){disponibilite = previousRoom['disponibilite']}else{
    disponibilite = req.body['availability'];
};
if(req.body['extendable'] === undefined){extendable = previousRoom['extensible']}else{
    extendable = req.body['extendable'];
};

if(req.body['problems'] === undefined){problems = previousRoom['problemes']}else{
     problems = req.body['problems'];
   
};

console.log(req.body);
 console.log(capacity , vue, prix, desc, disponibilite, extendable, problems);
 console.log(previousRoom);

// console.log("here" + room_number);

try {

    client.query("UPDATE projet.chambre SET prix= $1, capacite= $2, vue = $3, extensible = $4, disponibilite = $5 , problemes = $6, description =$7 WHERE num_chambre = $8", [
        prix, capacity, vue, extendable, disponibilite, problems, desc, room_number
    ]);

    res.redirect("/rooms");
    
} catch (error) {
    console.log("cannot update room.")
}

});
app.get("/filter", (req,res)=>{

    res.redirect("/");

});

app.post("/confirmBooking", async (req,res) =>{

    const id = req.body['res-id'].trim();
    try {

        await client.query(`UPDATE projet.reservation set statut = 'confirmed' WHERE id_reservation = $1`,[
            id
        ]);

        const updatedRes = await client.query(`SELECT r.*, h.nom_hotel, c.ID_hotel
            FROM projet.Reservation r
            INNER JOIN projet.Chambre c ON r.num_chambre = c.num_chambre
            INNER JOIN projet.Hotel h ON c.ID_hotel = h.ID_Hotel`);


            reservations = updatedRes.rows;

        res.redirect("/");

        
    } catch (error) {
        console.log("Cannot update reservation status")
        
    }

    console.log(req.body);

});

app.post("/checkIN", async (req,res) => {

    try {
        const currentRes = await client.query(`SELECT r.*, h.nom_hotel, c.ID_hotel
            FROM projet.Reservation r
            INNER JOIN projet.Chambre c ON r.num_chambre = c.num_chambre
            INNER JOIN projet.Hotel h ON c.ID_hotel = h.ID_Hotel`);

            var nas_client ;
            var nas_employee;
            var dateA;
            var dateD;
            var num_chambre;
            var statut = "confirmed";
            var dateR ;
            var dateL = new Date();
            num_chambre = req.body['res-id'];
            var idR ; 
            
            var listRes = currentRes.rows;

            const num = await client.query(`SELECT COUNT(*) FROM projet.location`);
            console.log(num);
            // var newIndex = listRes.length + 1;
            var newIndex = parseInt(num.rows[0]['count']) + 1;


            for(let i = 0 ; i < listRes.length; i++){
                // console.log(listRes[i]['num_chambre']);

                if(listRes[i]['num_chambre'] == num_chambre){
                    
                   nas_client = listRes[i]['nas_client'];
                   dateA = listRes[i]['date_arrivee'];
                   dateD = listRes[i]['date_depart'];
                   dateR = listRes[i]['date_reservation'];
                   idR = listRes[i]["id_reservation"];
                }
            }
        
            nas_employee = req.body['id_employee'].trim();
           
             await client.query(`INSERT INTO projet.location
             VALUES ($1, $2, $3, $4, $5,$6,$7, $8)`, [
                    newIndex, num_chambre, nas_client, nas_employee, dateL, dateA, dateD, statut
             ]);

             await client.query(`UPDATE projet.reservation set statut = 'checked-in' WHERE id_reservation = $1`,[
                idR
            ]);
    
            const updatedRes = await client.query(`SELECT r.*, h.nom_hotel, c.ID_hotel
                FROM projet.Reservation r
                INNER JOIN projet.Chambre c ON r.num_chambre = c.num_chambre
                INNER JOIN projet.Hotel h ON c.ID_hotel = h.ID_Hotel`);
    
    
                reservations = updatedRes.rows;


                res.redirect("/");


    } catch (error) {
        console.log(error);
        
    }

// console.log(req.body);

});