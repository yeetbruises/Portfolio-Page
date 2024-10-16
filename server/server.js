const express = require("express")
const cors = require("cors")
const path = require('path');

const app = express();
const port = 3002;


app.use(express.json());
app.use(cors());


app.get("/api", (req, res) => {
    res.json({"users": ["userOne"]})
});

//app.use("/images", express.static(path.join(__dirname, '/images')));

app.listen(port, () => console.log("Server started on port " + port));
