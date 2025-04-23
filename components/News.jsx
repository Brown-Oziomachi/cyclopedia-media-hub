"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = '8077e1560d2b4646ab9cb6d41cbc3b42';
    const endpointUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;

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
