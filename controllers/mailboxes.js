
const Mailbox = require('../models/mailbox.js');
const express = require('express');
const router = express.Router();


// CREATE - POST - /mailboxes
router.post('/', async (req, res) => {
    try {
        // create new mailbox with data from the body
        const createdMailbox = await Mailbox.create(req.body);
        res.status(201).json(createdMailbox);
    } catch (err) {
        // handle error
        res.status(500).json({ err: err.message });
    }

});

// READ - GET - /mailbox
router.get('/', async (req, res) => {
    try {
        const foundMailboxes = await Mailbox.find();
        res.status(200).json(foundMailboxes);  // 200 OK
    } catch (err) {
        // Add error handling code
        res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
});

// READ - GET - /mailboxes/:mailboxId
router.get('/:mailboxId', async (req, res) => {
    try {
        const foundMailbox = await Mailbox.findById(req.params.mailboxId);
        if (!foundMailbox) {
            res.status(404);
            throw new Error('Mailbox not found.');
        }
        res.status(200).json(foundMailbox);
    } catch (err) {
        // Add error handling code for 404 errors
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            // Add else statement to handle all other errors
            res.status(500).json({ err: err.message });
        }
    }
});

router.delete('/:mailboxId', async (req, res) => {
    try {
        const foundMailbox = await Mailbox.findByIdAndDelete(req.params.mailboxId);
        if (!foundMailbox) {
            res.status(404);
            throw new Error('Mailbox not found');
        }
        res.status(200).json(foundMailbox);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            // Add else statement to handle all other errors
            res.status(500).json({ err: err.message });
        }
    }
})


module.exports = router;