require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Genre1" },
  { id: 2, name: "Genre2" },
  { id: 3, name: "Genre3" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
