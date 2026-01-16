const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/news", async (req, res) => {
  const { keyword, category } = req.query;

  try {
    let response;

    // search
    if (keyword) {
      response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: keyword,
          language: "en",
          sortBy: "relevancy",
          apiKey: process.env.NEWS_API_KEY,
        },
      });

      
      response.data.articles = response.data.articles.filter(
        (article) =>
          article.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          article.description?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    //categories
    else {
      response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          category: category || "general",
          apiKey: process.env.NEWS_API_KEY,
        },
      });
    }

    res.json(response.data);
  } catch (error) {
    console.error("News API error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(5000, () =>
  console.log(" Backend running on http://localhost:5000")
);
