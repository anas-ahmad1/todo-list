const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/utils/db");
const { protect } = require("./src/middleware/authMiddleware")

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use('/auth', require('./src/routes/authRoutes'))
app.use('/tasks', protect, require('./src/routes/taskRoutes'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
