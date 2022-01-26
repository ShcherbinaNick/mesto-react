import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [ cards, setCards ] = React.useState([])

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err));
  } 

  const handleCardDelete = (card) => {
    api.removeCard(card._id)
    .then(() => {
      setCards((card) => cards.filter(c => c._id !== card._id))
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    api.getInitialCards()
      .then((places) => {
        setCards(places)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={ currentUser.avatar } alt="Кусто" className="profile__avatar" />
          <button className="profile__avatar-button" onClick={ onEditAvatarClick } ></button>
        </div>
        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__title">{ currentUser.name }</h1>
            <button type="button" aria-label="редактировать профиль" className="profile__edit-button" onClick={ onEditProfileClick }></button>
          </div>
          <p className="profile__subtitle">{ currentUser.about }</p>
        </div>
        <button type="button" aria-label="добавить карточку" className="profile__add-button" onClick={ onAddPlaceClick }></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          { cards.map(({ _id, ...card }) =>
            <Card cardData={ { ...card, _id } } key={ _id } onCardClick={ onCardClick } onCardLike={ handleCardLike } onCardDelete={ handleCardDelete } />
          ) }
        </ul>
      </section>
    </main>
  );
}

export default Main;


