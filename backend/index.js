const express = require("express");
const app = express();
const deployRoute = require("./routes/deploy");
require("dotenv").config();
const cors = require("cors");

app.use(cors());


app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());
app.use("/api", deployRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
