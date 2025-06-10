const mongoose = require('mongoose');



const mailboxSchema = mongoose.Schema({


    boxOwner: {
        type: String,
        required: true,
    },
    boxSize: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        required: true,
    },

});

const Mailbox = mongoose.model('Mailbox', mailboxSchema);

module.exports = Mailbox;