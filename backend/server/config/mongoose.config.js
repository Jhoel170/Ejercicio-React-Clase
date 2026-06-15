const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/epn_bdd", {
})
    .then(() => console.log(`Established a connection to database`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

