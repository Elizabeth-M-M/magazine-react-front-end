import React from "react";
import { Link, useNavigate } from "react-router-dom";
// This component is responsible for styling of the articles using cards displayed on the screen, the left side
const ArticleImage = ({ elem }) => {
  const navigator = useNavigate();

  return (
    <div
      className="header-bottom-card card-hover"
      onClick={() => {
        navigator(`/articles/${elem.id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      {!elem.id ? null : elem.id % 2 !== 0 ? null : (
        <div className="image-holder">
          <img src={elem.image} alt={elem.part_title} />
        </div>
      )}
      <div className="p-3">
        <small className="theme-light text-uppercase pb-2">
          {elem.category}
        </small>
        <h4 className="theme-light-mellow-color">{elem.part_title}</h4>

        <small className="theme-light ">{elem.summary}</small>
        <div className="mt-3">
          <i className="bi bi-list me-2 fw-bold text-light"></i>
          <Link to={`/articles/${elem.id}`} className="category-link">
            READ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleImage;
