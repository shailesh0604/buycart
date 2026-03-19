const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const app = express();
const connectDb = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes")
const errorHandler = require("./src/middleware/errorHandler");
const PORT = process.env.PORT || 4000;

dotenv.config();
connectDb();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use('/api/auth', authRoutes);

// Error handler (must be last)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
