import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, error: "Missing username (q)" });
    }

    // Call original API
    const response = await fetch(`https://api-toxxic.zone.id/api/stalker/gitstalk?q=${encodeURIComponent(q)}`);
    const data = await response.json();

    // Override creator
    data.creator = "Mr Frank";

    res.json({
      success: true,
      api: "GitStalk",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
