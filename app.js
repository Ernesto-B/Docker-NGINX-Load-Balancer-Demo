const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const serverName = process.env.SERVER_NAME || "Unknown Server";

app.get("/", (req, res) => {
    console.log(req.headers);
    res.send(`HOME PAGE, from ${serverName}, running on port ${PORT}`);
});

app.get("/info", (req, res) => {
    console.log(req.headers);
    res.send(`INFORMATION page, from ${serverName}, running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});