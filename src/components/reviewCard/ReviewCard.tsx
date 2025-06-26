import React from "react";
import './ReviewerCard.scss'

type Props = {
  title: string,
  company: { name: string, logo: string },
  review: string,
  reviewer: { name: string, photo: string, position: string },
  cardClass: string
}

export const ReviewCard: React.FC<Props> = ({ company, review, reviewer, cardClass }) => {
  return (
    <div className={"card" + ' ' + cardClass}>
      <div className="card_company-box">
        <img className="card_company-photo" src={company.logo} alt="company Logo" />
      </div>
      <div className="card_review">
        <p className="card_review-text">
          {review}
        </p>
      </div>
      <div className="card_reviewer-box">
        <div className="card_photo-box">
          <img className="card_profile-picture" src={reviewer.photo} alt="reviewer profile" /></div>
        <div className="card_reviewer-desc">
          <h4 className="card_name">{reviewer.name}</h4>
          <p className="card_position">{reviewer.position + ', ' + company.name}</p>
        </div>
      </div>
    </div>
  );
};
