var config = require('config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log('connecting db : ' + config.mongoose.SMTM_RESTAURANT_DB_URL);
var db = mongoose.createConnection(config.mongoose.SMTM_RESTAURANT_DB_URL);

var restaurantSchema = new Schema({
    name : String,
    mainMenu : [String],
    address : String,
    gps : {
        latitude : Number,
		longitude : Number
    },
    menu : [{
        id : Schema.Types.ObjectId,
        nm_ko : String,
        nm_en : String,
        price : String
    }],
    created_at : Date,
	updated_at : Date,
	creator : String,
	modifier : String
});


restaurantSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.updated_at = currentDate;
	if(!this.create_at) {
		this.create_at = currentDate;
	}
	next();
});

var Restaurant = db.model('Restaurant', restaurantSchema);
module.exports = Restaurant;