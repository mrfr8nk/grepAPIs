import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({ success: false, error: "Missing prompt" });
    }

    // Call original API
    const response = await fetch(`https://api-toxxic.zone.id/api/ai/venice?prompt=${encodeURIComponent(prompt)}`);
    const data = await response.json();

    // Override creator
    data.creator = "Mr Frank";

    res.json({
      success: true,
      api: "Venice",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
