const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const cors = require("cors"); // Import cors

const app = express();

// Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://your-production-domain.com"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions)); // Enable CORS middleware

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config/config.env" });
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(router);
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

module.exports = app;
