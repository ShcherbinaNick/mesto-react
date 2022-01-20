import React from "react";

function Card({ cardData, onCardClick }) {
  const { name, link, likes } = cardData;

  const handleCardClick = () => {
    onCardClick(cardData)
  }

  return (
    <li className="card">
      <div className="card__image-container">
        <img src={ link } alt="фото достопримечательности" className="card__image" onClick={ handleCardClick }/>
      </div>
      <button type="button" aria-label="удалить" className="card__delete"></button>
      <div className="card__text">
        <h2 className="card__name">{ name }</h2>
        <div className="card__like-container">
          <button type="button" aria-label="поставить лайк" className="card__like-button"></button>
          <p className="card__like-counter">{ likes.length }</p>
        </div>
      </div>
    </li>
  );
}

export default Card;