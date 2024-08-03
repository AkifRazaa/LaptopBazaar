const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://Uzair2002:Uzair_2002@cluster0.cg671vq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const MongoDB = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Error: ", error));
};

module.exports = MongoDB;
