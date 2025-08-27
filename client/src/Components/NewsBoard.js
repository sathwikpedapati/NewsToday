import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=c7a1126781ec46b0976cec068bfc87e2`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(Array.isArray(data.articles) ? data.articles : []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Top <span className="badge bg-danger"> Headlines</span>
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p className="text-center">No news found for this category.</p>
      )}
    </div>
  );
};

export default NewsBoard;
