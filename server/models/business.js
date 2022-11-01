let mongoose = require('mongoose');

// create a model class
let businessModel = mongoose.Schema({
    Contact_Name: String,
    Email: String,
    Contact_Number: Number
},
{
    collection: "binfo"
});

module.exports = mongoose.model('Business', businessModel);