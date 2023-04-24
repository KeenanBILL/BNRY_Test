import React from "react";

export default function Articles(article) {
  return (
    <div id={article.id} onClick={article.onClick} className="article">
      <h3 className="article-title">{article.article.title}</h3>
      <p className="article-description">{article.article.description}</p>
    </div>
  );
}