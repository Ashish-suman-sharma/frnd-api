const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from images directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Sample user data
const userData = [
  {
    id: 1,
    name: "John Doe",
    about: "Software Developer with 5 years of experience",
    image: "/images/BeautyPlus_20230422145754740_save.jpg",
    registrationNumber: "REG001",
  },
  {
    id: 2,
    name: "Jane Smith",
    about: "UI/UX Designer passionate about creating beautiful interfaces",
    image: "/images/BeautyPlus_20230426145857290_save.png",
    registrationNumber: "REG002",
  },
  {
    id: 3,
    name: "Mike Johnson",
    about: "Full Stack Developer specializing in MERN stack",
    image: "/images/BeautyPlus_20230507221313777_save.jpg",
    registrationNumber: "REG003",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    about: "Data Scientist with expertise in machine learning",
    image: "/images/BeautyPlus_20230522203038173_save.jpg",
    registrationNumber: "REG004",
  },
  {
    id: 5,
    name: "David Brown",
    about: "DevOps Engineer with cloud computing experience",
    image: "/images/BeautyPlus_20230523182236748_save.jpg",
    registrationNumber: "REG005",
  },
];

// API Routes

// Get all users
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    message: "Users retrieved successfully",
    data: userData,
  });
});

// Get single user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userData.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

// Get user by registration number
app.get("/api/users/registration/:regNumber", (req, res) => {
  const regNumber = req.params.regNumber;
  const user = userData.find((u) => u.registrationNumber === regNumber);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this registration number",
    });
  }

  res.json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Simple Express API",
    endpoints: {
      "Get all users": "GET /api/users",
      "Get user by ID": "GET /api/users/:id",
      "Get user by registration": "GET /api/users/registration/:regNumber",
    },
  });
});

// Handle 404 for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - GET /api/users - Get all users`);
  console.log(`   - GET /api/users/:id - Get user by ID`);
  console.log(
    `   - GET /api/users/registration/:regNumber - Get user by registration number`
  );
});
