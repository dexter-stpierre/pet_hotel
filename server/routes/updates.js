var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeOutMillis: 30000,
};

var pool = new pg.Pool(config);

//PUT request to update completionstatus in the database:
// router.put('/', function(req, res){
//   var checkIn = req.body;
//   console.log('Put route called with task of ', checkIn);
//   pool.connect(function(errorConnectingToDatabase, db, done){
//     if(errorConnectingToDatabase) {
//       console.log('Error connecting to the database.');
//       res.sendStatus(500);
//     } else {
//       console.log(checkIn);
//       var queryText = 'UPDATE "pets" SET "check_in" = $1 WHERE id = $2;';
//       db.query(queryText, [checkIn.check_in, checkIn.id], function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery) {
//           console.log('Attempted to query with', queryText);
//           console.log('Error making UPDATE query');
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(200);
//         }
//       }); // end query
//     } // end if
//   }); // end pool
// }); //end router.put

//PUT request to update petsinfo in the database:
router.put('/pets', function(req, res){
  var update = req.body;
  console.log('Put route called with task of ', update);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      console.log(update);
      var queryText = 'UPDATE "pets" SET "pet_name"= $1,"breed"= $2,"color"= $3 WHERE id = $4;';
      db.query(queryText, [update.pet_name, update.breed, update.color, update.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making UPDATE query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.put

router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "pets" WHERE id = $1;';
      db.query(queryText, [id], function(errorMakingQuery, result){
        done(); //VERY IMPORTANT
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making DELETE FROM query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.delete

module.exports = router;
