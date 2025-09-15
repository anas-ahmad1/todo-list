const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/utils/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
