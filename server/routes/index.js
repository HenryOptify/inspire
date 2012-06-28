
/*
 * GET home page.
 */

exports.index = function(req, res){
	// Mongo
	var mongo = require('mongodb'),
	  Server = mongo.Server,
	  Db = mongo.Db;
	
	var server = new Server('localhost', 27017, {auto_reconnect: true});
	var db = new Db('inspiretest', server);
	
	var docs = []; 
	
	db.open(function(err, db) {
	  if(!err) {
		db.collection('test1', function(err, collection) {

			collection.find().toArray(function(err, items) {});
	
			var stream = collection.find().streamRecords();
			stream.on("data", function(item) {
				docs.push(item) 
			});
			stream.on("end", function() {
					res.render('index', { title: 'Inspiration', locals : { docs : docs }})
			});
	
			collection.findOne({mykey:1}, function(err, item) {
				//console.log('item', item); 
			});
				


		});
	  };
	});
	


	
	
};

exports.post_submit = function(req, res){
	// Mongo
	var mongo = require('mongodb'),
	  Server = mongo.Server,
	  Db = mongo.Db;

	
	var server = new Server('localhost', 27017, {auto_reconnect: true});
	var db = new Db('inspiretest', server);
			
	var inspire_doc = {user : req.body.user, doc : req.body.doc}; 		
			
		db.open(function(err, db) {
		  if(!err) {
		  
			db.collection('test1', function(err, collection) {
			  var docs = [inspire_doc];
		
			  collection.insert(docs, {safe:true}, function(err, result) {
		
			  });
			});
		  };
		});

	res.json(inspire_doc); 
}; 


exports.get_submit = function(req, res){
	res.render('submit', {title : 'Submit'}); 
}; 