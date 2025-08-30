import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Helpers to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Dynamically load all API files in /api
const apiPath = path.join(__dirname, "api");
fs.readdirSync(apiPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = `/${file.replace(".js", "")}`;
    import(`./api/${file}`).then((mod) => {
      app.use(route, mod.default);
      console.log(`✅ Loaded API: ${route}`);
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Mr Frank API running at http://localhost:${PORT}`);
});
