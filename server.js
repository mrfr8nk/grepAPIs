const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static("public"));

// Auto-load all APIs in /api folder
const apiDir = path.join(__dirname, "api");

fs.readdirSync(apiDir).forEach(file => {
  if (file.endsWith(".js")) {
    const route = require(path.join(apiDir, file));
    app.use(`/api/${route.name}`, route.router);
  }
});

// Endpoint to list available APIs
app.get("/api-list", (req, res) => {
  const apis = fs.readdirSync(apiDir)
    .filter(f => f.endsWith(".js"))
    .map(f => f.replace(".js", ""));
  res.json({ apis });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
