const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello from Node.js CI/CD Demo App!");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});