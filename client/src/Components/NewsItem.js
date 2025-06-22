import React from 'react';

const NewsItem = ({ title, description, src, url }) => {
  const fallbackImage = "/news.jpg"; 

  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px" }}>
      <img
        src={src ? src : fallbackImage}
        style={{ height: "150px", width: "330px" }}
        className="card-img-top"
        alt="news"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={url} className="btn btn-primary" target="_blank" rel="noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
