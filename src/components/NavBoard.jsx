import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';

const NavBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('API Key:', apiKey);

        if (!apiKey) {
          throw new Error('API key is not defined');
        }

        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
        console.log('Fetching URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.articles) {
          throw new Error('No articles found in the response');
        }

        setArticles(data.articles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, [apiKey, category]); // Corrected dependency array syntax

  return (
    <div>
      <h2 className="text-center text-light">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NavItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default NavBoard;

