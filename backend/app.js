const express = require("express");
const cors = require("cors");

const blueprintRoutes = require("./routes/blueprintRoutes");
const contractRoutes = require("./routes/contractRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blueprints", blueprintRoutes);
app.use("/api/contracts", contractRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
