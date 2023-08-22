//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require('http');
const path = require("path");
const users = require('./data').storeDB;
// const dotenv = require('dotenv');


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 1995;
const SECRET_KEY = "1e4cF#Vj8Lp$6Gx!Zo0Wd7Bn@k9mXq3e";



app.use(express.static(path.join(__dirname,'./public')));
// dotenv.config({ path: './.env'});
app.use(express.static(publicDir))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

  // Connect to the MongoDB database
  mongoose.connect('mongodb://0.0.0.0:27017/StoreDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Define a schema for your data
const storeSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  });
  
  // Create a model based on the schema
  const Store = mongoose.model('Store', storeSchema);

  app.get("/", (req, res) => {
    res.render("index")
})
  
  
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
  
    bcrypt
      .hash(password, 5)
      .then(hashedPassword => {
        const newStore = new Store({ username, email, password: hashedPassword });
        return newStore.save();
      })
      .then(() => {
        res.status(201).json({ message: "User registered successfully" });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
  });
  
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    Store.findOne({ username })
      .then(store => {
        if (!store) {
          res.status(401).json({ message: "User not found" });
          return;
        }
  
        return bcrypt.compare(password, store.password);
      })
      .then(passwordMatch => {
        if (!passwordMatch) {
          res.status(401).json({ message: "Invalid password" });
          return;
        }
  
        const token = jwt.sign({ username }, SECRET_KEY);
        res.status(200).json({ token });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });