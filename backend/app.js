const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const noteRoutes = require("./routes/notes-routes");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/notes", noteRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bnaxbue.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
  )
  .then(
    app.listen(process.env.PORT || 5000, () => {
      console.log("server up and running!");
    })
  )
  .catch((err) => console.log(err));
