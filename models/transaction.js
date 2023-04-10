const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    cashGiven: {
        type: Number,
        required: true
    },
    billAmount: {
        type: Number,
        required: true
    },
    amountReturned: {
        type: Number,
        required: true
    },
    noOfNotesReturned: {
        "2000": Number,
        "500": Number,
        "100": Number,
        "50": Number,
        "20": Number,
        "10": Number,
        "50": Number,
        "1": Number,
    }
},
{
    timestamps: true,
});


module.exports = mongoose.model('Transaction',transactionSchema);