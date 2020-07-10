const mongoose = require('mongoose');
const gradeSchema = mongoose.Schema({
    locationId: {
        type: String,
        required: 'Please Enter Location ID'
    },
    locationName: { type: String, required: 'Please Enter Location Name' },
    routerAddress: { type: String },
});
module.exports = mongoose.model('router', gradeSchema);