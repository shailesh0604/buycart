const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const app = express();
const connectDb = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes")
const errorHandler = require("./src/middleware/errorHandler");
const PORT = process.env.PORT || 4000;
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// Middleware
app.use(helmet());
app.use(cookieParser());

dotenv.config();
connectDb();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
console.log("ruuning");
// normally get request
app.get("/", (req, res) => res.send("API running ✅"));

//routes
app.use('/api/auth', authRoutes);

// Error handler (must be last)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
