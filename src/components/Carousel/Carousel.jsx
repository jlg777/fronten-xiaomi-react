import React from "react";

const images = [
  "/assets/images/1024_682.jpeg",
  "/assets/images/1024_682 (1).jpeg",
  "/assets/images/1024_682 (2).jpeg",
  "/assets/images/1024_682 (3).jpeg",
  "/assets/images/1024_682 (4).jpeg",
];

const Carousel = () => {
  return (
    <div
      id="section-carousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#section-carousel"
            data-bs-slide-to={index}
            className={
              index === 0
                ? "active carousel-indicator-custom"
                : "carousel-indicator-custom"
            }
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="2000">
          <img
            src="/assets/images/1024_682.jpeg"
            className="d-block w-100"
            alt="image-Carrousel-1"
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="/assets/images/1024_682 (1).jpeg"
            className="d-block w-100"
            alt="image-Carrousel-2"
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="/assets/images/1024_682 (2).jpeg"
            className="d-block w-100"
            alt="image-Carrousel-3"
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="/assets/images/1024_682 (3).jpeg"
            className="d-block w-100"
            alt="image-Carrousel-4"
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="/assets/images/1024_682 (4).jpeg"
            className="d-block w-100"
            alt="image-Carrousel-5"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#section-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#section-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
