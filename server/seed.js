const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./src/models/User");
const Category = require("./src/models/Category");
const Task = require("./src/models/Task");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany({});
    await Category.deleteMany({});
    await Task.deleteMany({});
    console.log("Existing data cleared");

    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    });
    console.log("Test user created");

    const categories = await Category.create([
      { name: "Work", user: user._id },
      { name: "Personal", user: user._id },
      { name: "Health", user: user._id },
    ]);
    console.log("Categories created");

    const tasks = await Task.create([
      {
        title: "Finish project report",
        description: "Complete the final report by end of day",
        priority: "High",
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        completed: false,
        user: user._id,
        category: categories[0]._id,
      },
      {
        title: "Buy groceries",
        description: "Milk, Bread, Eggs, Vegetables",
        priority: "Medium",
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        completed: false,
        user: user._id,
        category: categories[1]._id,
      },
      {
        title: "Morning workout",
        description: "30 mins cardio and stretching",
        priority: "Low",
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        completed: false,
        user: user._id,
        category: categories[2]._id,
      },
      {
        title: "Submit timesheet",
        description: "",
        priority: "Medium",
        completed: true,
        user: user._id,
        category: categories[0]._id,
      },
      {
        title: "Read a book",
        description: "Read at least 50 pages",
        priority: "Low",
        completed: true,
        user: user._id,
        category: categories[1]._id,
      },
    ]);
    console.log("Tasks created");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedData();
