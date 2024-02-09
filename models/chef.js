const { getDb } = require('../db/db.config');

const getAll = async () => {
    try {
        const db = getDb();
        const chefs = await db.collection('chefs').find().toArray();
        return chefs;
    } catch (error) {
        throw new Error(`Error fetching chefs: ${error.message}`);
    }
};

module.exports = {
    getAll
};