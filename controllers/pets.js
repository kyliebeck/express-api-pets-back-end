
const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();


// CREATE - POST - /pets
router.post('/', async (req, res) => {
    try {
        // create new pet with data from the body
        const createdPet = await Pet.create(req.body);
        res.status(201).json(createdPet);
    } catch (err) {
        // handle error
        res.status(500).json({ err: err.message });
    }

});

// READ - GET - /pets
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);  // 200 OK
    } catch (err) {
        // Add error handling code
        res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
});

// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId);
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.status(200).json(foundPet);
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

router.delete('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findByIdAndDelete(req.params.petId);
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found');
        }
        res.status(200).json(foundPet);
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