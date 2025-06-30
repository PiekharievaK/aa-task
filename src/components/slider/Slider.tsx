import React, { useEffect, useState } from 'react';
import reviews from '../../data/rewiews.json'
import { ReviewCard } from '../reviewCard/ReviewCard';
import './slider.scss'


export const Slider: React.FC = () => {
  const [reviewsList] = useState(reviews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPAge] = useState(3)
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };


    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width < 640) {
      setItemsPerPAge(1);
    } else if (width < 1024) {
      setItemsPerPAge(2);
    } else {
      setItemsPerPAge(3);
    }
  }, [width]);


  const paginationPages = reviewsList.length / itemsPerPage

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % reviewsList.length;
    setCurrentIndex(newIndex);
    setCurrentPage(Math.floor(newIndex / itemsPerPage));
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + reviewsList.length) % reviewsList.length;
    setCurrentIndex(newIndex);
    setCurrentPage(Math.floor(newIndex / itemsPerPage));
  };
  return (
    <div className='slider'>
      <div className="slider_container">
        <button className='slider_button' onClick={prevSlide}>  <svg className='slider_button-icon'>
          <use href="/images/icons.svg#icon-left" />
        </svg></button>
        <div className="slider_window">
          <div className="slider_track">
            {
              reviewsList.map((review, idx) => {
                const total = reviewsList.length;
                const offset = (idx - currentIndex + total) % total;
                let cardClass = "slider_card";

                if (offset === 0) cardClass += " visible-0";
                else if (offset === 1) cardClass += " visible-1";
                else if (offset === 2) cardClass += " visible-2";
                else cardClass += " hidden";

                return (
                  <ReviewCard
                    key={review.title}
                    title={review.title}
                    company={review.company}
                    review={review.review}
                    reviewer={review.reviewer}
                    cardClass={cardClass}
                  />
                );
              })
            }
          </div>

        </div>
        <button className='slider_button' onClick={nextSlide}><svg className='slider_button-icon'><use href="/images/icons.svg#icon-right" /></svg> </button>
      </div>
      <div className='pagination'>
        {[...Array(Math.ceil(paginationPages))].map((_, idx) => {
          let paginationClass = "pagination_item";

          if (currentPage === idx) paginationClass += " active";
          return (
            <div key={idx} className={paginationClass}></div>
          )
        })}
      </div>
    </div>
  );
};
