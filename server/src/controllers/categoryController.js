const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

// Create a custom category
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Please add a name" });
  }

  const category = await Category.create({
    name,
    user: req.user.id,
  });

  res.status(201).json(category);
});

// Fetch categories that belongs to logged in user
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user.id });
  res.status(200).json(categories);
});

// Delete a specific category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });;
  }

  if (category.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized to delete this category" });;
  }

  await category.deleteOne();

  res.status(200).json({ message: "Category deleted successfully" });
});

module.exports = { createCategory, getCategories, deleteCategory };
