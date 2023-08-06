const express = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("./db");
const fs = require("fs");

const app = express();
const secretKey = "123456";

app.use(express.json());

// Token verification middleware
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded.username;
    next();
  });
}

// API endpoint for getting all products in the inventory
app.get("/products", verifyToken, (req, res) => {
  // Query for products with quantity less than 100
  const query = { instock: { $lt: 100 } };

  db.inventories.find(query).toArray((err, products) => {
    if (err) {
      console.error("Error retrieving products from the inventory:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(products);
  });
});

const userData = JSON.parse(fs.readFileSync("data.json"));

// Login API endpoint
app.post("/login", (req, res) => {
  // In a real-world scenario, you would validate the user's credentials here
  const { username, password } = req.body;

  // Check if the username and password are correct
  const user = userData.Users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // Generate a token
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

    // Return the token as a response
    res.json({ token });
  } else {
    // Invalid credentials
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Protected API endpoint
app.get("/protected", verifyToken, (req, res) => {
  // If the token is valid, return a success message
  res.json({ message: "Protected API endpoint accessed successfully" });
});

app.get('/orders', verifyToken, (req, res) => {
  // Read the data from data.json file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read data file' });
      return;
    }

    try {
      const { Order, Inventory } = JSON.parse(data);

      // Create a dictionary/map for easy inventory lookup by SKU
      const inventoryMap = {};
      Inventory.forEach(item => {
        inventoryMap[item.sku] = item;
      });

      // Add description to each order based on SKU lookup
      const ordersWithDescription = Order.map(order => {
        const inventoryItem = inventoryMap[order.item];
        return {
          ...order,
          description: inventoryItem ? inventoryItem.description : 'Unknown'
        };
      });

      res.json(ordersWithDescription);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to parse data file' });
    }
  });
});

module.exports = app;