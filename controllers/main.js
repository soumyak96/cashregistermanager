const transaction = require('../models/transaction');
const Transaction  = require('../models/transaction');

exports.getNotes = async (req, res) => {
    const { billAmount, cashGiven } = req.body;
    const availableNotes = [2000, 500, 100, 50, 20, 10, 5, 1];
    var noOfNotes = [0, 0, 0, 0, 0, 0, 0, 0];
    if (billAmount > 0) {
        if (Number(cashGiven) >= Number(billAmount)) {
            var transaction = new Transaction();
            var amountToBeReturned = cashGiven - billAmount;

            transaction.cashGiven = cashGiven;
            transaction.billAmount = billAmount;
            transaction.amountReturned = amountToBeReturned;

            for (let i = 0; i < availableNotes.length; i++) {
                var numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);
                amountToBeReturned = amountToBeReturned % availableNotes[i];
                noOfNotes[i] = numberOfNotes;
            }

            transaction.noOfNotesReturned[2000] = noOfNotes[0];
            transaction.noOfNotesReturned[500] = noOfNotes[1];
            transaction.noOfNotesReturned[100] = noOfNotes[2];
            transaction.noOfNotesReturned[50] = noOfNotes[3];
            transaction.noOfNotesReturned[20] = noOfNotes[4];
            transaction.noOfNotesReturned[10] = noOfNotes[5];
            transaction.noOfNotesReturned[5] = noOfNotes[6];
            transaction.noOfNotesReturned[1] = noOfNotes[7];
            

            await transaction.save();

            return res.status(200).json({
                message: 'SUCCESS',
                notes: noOfNotes
            });

        } else {
            return res.status(400).json({
                error: 'The Amount is lesser then bill!'
            });
        }
    } else {
        return res.status(400).json({
            error: 'Invalid Bill Amount'
        });
    }
};

exports.encryptPassword = async (req, res) => {
    const { password } = req.body;
    if(password) {
        return res.status(200).json({
            message: 'SUCCESS',
            encryptedPassword: btoa(password)
        });
    } else {
        return res.status(400).json({
            error: 'Password not Found'
        });
    }
}