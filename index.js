const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const app = express(); // Create an instance of Express
const PORT = process.env.PORT || 5000;
const { connectDB } = require("./src/config/database"); // Import the database connection function
const cors = require("cors"); // Import CORS middleware
const morgan = require("morgan"); // Import morgan for logging
// Middleware to enable CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://book-store-frontend-a58v.vercel.app/",
//     ],
//     credentials: true,
//   })
// );
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-nest-store-frontend-pdv3mz2wv-technishant204s-projects.vercel.app",
    ],
    credentials: true,
  })
);

// Connect to the database
connectDB();

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
    Book-Store Server is running on http://localhost:${PORT}`);
});
