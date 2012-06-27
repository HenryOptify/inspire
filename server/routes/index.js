
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

exports.submit = function(req, res){

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
