const express = require("express");
const path = require("path");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/users", userRoutes);
app.use("/donors", donorRoutes);
app.use("/requests", requestRoutes);

app.get("/", (req, res) => {
    res.send("Blood Bank MVC Application");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});