// models/chefModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = new Schema({
    // Define chef schema fields
});

const Chef = mongoose.model('Chef', chefSchema);
module.exports = Chef;