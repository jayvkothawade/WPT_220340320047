const express = require('express');
const app = express();
const mysql = require("mysql2");

let dbparams={
	host : 'localhost',
	user : 'jay',
	password : 'cdac',
	database : 'wpt',
	port : 3306
}

const con=mysql.createConnection(dbparams);
app.use(express.static("abc"));

app.get('/bookinfo', function (req, res)) => {
       let bookid =req.query.bookid;

	   let output = {status:false, bookdetails:{bookid: 0, bookname: "", price=0}}
	   con.query('select bookid, bookname, price from book where bookid=?',[bookid],
	   (err, rows) => {
		if(err){
			console.log("Error has Occured");
		} else{
			if(rows.length>0){
				console.log("Book Found");
				console.log(rows[0]);
				output.status = true;
				output.bookdetails = rows[0];

			} else{
				console.log("book not found");
			}
		}
		console.log(output);

	   res.send(output);
	
});


app.get('/updateprice', function (req, res)) => {
	let bookid =req.query.bookid;
	let price = req.query.price;

	let output = false;
	con.query('update book set price=? where bookid =?',[price, bookid],
	(err, res) => {
	 if(err){
		 console.log("Error has Occured");
	 } else{
		 if(res.affectedRows > 0){
			 console.log("Book price Updated");
			 output = true;

		 } else{
			 console.log("bookprice not Updated");
		 }
		}
	 

	res.send(output);
 
	 });

	 app.listen(8081, function(){
		console.log("Listening on port 8081")
	 });









// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(cors());


// const bodyParser = require('body-parser');






// app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not



// var result;

// // app.post('/poc1', function (req, res) {
	
// // 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
// //     	var xyz ={ v1:37, v2:35};
// //         res.send(xyz);
// //     });


// app.get('/', function (req, res) {
    
	
//         console.log("reading input " + req.query.xyz);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});




// app.listen(8081, function () {
//     console.log("server listening at port 8081...");
// });