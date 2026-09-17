import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const categories = [
  "technology",
  "business",
  "sports",
  "health",
  "entertainment",
];

function App() {
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  // Category news
  const fetchNews = async (category = "general") => {
    setLoading(true);
    setError("");
    setSearchTerm("");
    setArticles([]);

    try {
      const res = await axios.get("/api/news", {
        params: { category },
      });

      setArticles(res.data.articles || []);
    } catch {
      setError("Failed to load headlines.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews("general");
  }, []);

  // Carousel
  useEffect(() => {
    if (articles.length < 2) return;

    const interval = setInterval(() => {
      setSlideIndex(
        (prev) => (prev + 1) % Math.min(5, articles.length)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [articles]);

  // Search news
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    setSearchTerm(keyword);
    setKeyword("");
    setArticles([]);
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/api/news", {
        params: { keyword },
      });

      if (!res.data.articles || res.data.articles.length === 0) {
        setError("No results found");
      } else {
        setArticles(res.data.articles);
      }
    } catch {
      setError("Search failed.");
    }

    setLoading(false);
  };

  const heroSlides = articles.slice(0, 5);
  const otherArticles = articles.slice(5, 40);

  return (
    <div className="container">
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Fetching latest headlines...</p>
        </div>
      )}

      <h1 className="brand">
        INSIGHT <span>DAILY</span>
      </h1>

      <p className="tagline">
        Your window to the world, updated every moment
      </p>

      {/* Search */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search English news..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {/* Filters */}
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => {
              setActiveCategory(cat);
              fetchNews(cat);
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {searchTerm && !loading && !error && (
        <p className="results-text">
          Results for <span>“{searchTerm}”</span>
        </p>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="no-results">
          <h2>{error}</h2>
          <p>Try a different keyword</p>
        </div>
      )}

      {/* Carousel */}
      {!loading && searchTerm === "" && heroSlides.length > 0 && (
        <div className="carousel">
          {heroSlides.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className={`carousel-slide ${
                index === slideIndex ? "active" : ""
              }`}
              style={{
                backgroundImage: `url(${article.urlToImage})`,
              }}
            >
              <div className="carousel-overlay">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      <div className="articles-grid">
        {otherArticles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="article-card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt=""
                />
              )}

              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;

