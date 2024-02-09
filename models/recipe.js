const { getDb } = require('../db/db.config');

const getAll = async () => {
    try {
        const db = getDb();
        const recipes = await db.collection('recipes').find().toArray();
        return recipes;
    } catch (error) {
        throw new Error(`Error fetching recipes: ${error.message}`);
    }
};

module.exports = {
    getAll
};