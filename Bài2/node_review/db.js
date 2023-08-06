const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = async () => {
  const uri = "mongodb+srv://quocnapy2001:05JVKkxIZftLjynU@cluster0.g9em0sc.mongodb.net/?retryWrites=true&w=majority";
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("AnhQuoc");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = { connectToDb, db };