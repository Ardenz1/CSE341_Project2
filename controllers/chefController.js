const Chef = require('../models/chef');

// Controller functions for chef operations
// Example: Create a new chef
const createChef = async (req, res) => {
    try {
        const chef = new Chef(req.body);
        const newChef = await chef.save();
        res.status(201).json(newChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createChef
};