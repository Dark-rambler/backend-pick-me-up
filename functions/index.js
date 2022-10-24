const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
var cors =require('cors')
const app = express();
app.use(cors())


admin.initializeApp({
    credential: admin.credential.cert("./credentials.json"),
    databaseURL: "firebase-adminsdk-tv7k3@fir-crud-c44e7.iam.gserviceaccount.com",
});

app.get("/hello-world", (req, res) => {
    return res.status(200).json({message: "hello-world"});
});

app.use(require("./routes/product.routes"));

exports.app = functions.https.onRequest(app);


