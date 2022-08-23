const express = require("express");
const router = require("./router");
const path = require("path");
const cors = require("cors");

const app = express();

//?cors
var whitelist = ["http://localhost:8888", "http://localhost:3000"];
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:8888", "http://localhost:3000"],
    })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);
app.listen(3333, () => {
    console.log("server listening on port 3333!");
});