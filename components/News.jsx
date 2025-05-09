"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  
    if (!apiKey) {
      console.error("API Key is missing! Set it in Vercel environment variables.");
      return;
    }
  
    const query = "latest";
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  
    axios.get(url)
      .then((response) => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);
  
  
  return (
    <div>
      <h1>News</h1>
      <ul>
        {News.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
