const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const cors = require("cors"); // Import cors
// const PORT = parseInt(Math.random() * 4000 + 1000);
const PORT = 4020;

// UncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

// connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://your-production-domain.com"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions)); // Enable CORS middleware

const server = app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
