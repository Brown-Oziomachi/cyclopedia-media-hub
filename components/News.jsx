"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const query = "latest";
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const endpointUrl = url;
    
    axios.get(endpointUrl)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((article, index) => (
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
