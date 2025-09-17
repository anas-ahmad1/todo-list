const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

// Create a custom category 
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Please add a name");
    }

    const category = await Category.create({
        name
    });

    res.status(201).json(category);
});

module.exports = { createCategory };