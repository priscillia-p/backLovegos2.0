var mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
/*mongoose.connect('mongodb://localhost/logos_core');

var getAllUsers = function(){
    utilisateur.find({}, function (err, users){
    if(err) throw err;
    return users;
    console.log(users);
    
})};

module.exports = mongo;*/

const init = () => {
    connectMongo();
    mongoose.connection.on('connected', () => console.log(`connected to db: "logos"`));
  };
  
  
  // connect to mongo host, set retry on initial fail
  const connectMongo = () => {
    mongoose.connect('mongodb://localhost/logos');
  }

  module.exports = init;