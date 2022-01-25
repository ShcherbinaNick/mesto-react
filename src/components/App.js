import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';


function App() {
  
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard] = React.useState({ name: '', link: ''});
  
  const [ currentUser, setCurrentUser ] = React.useState({
    'name': '',
    'avatar': '',
    'about': '',
    '_id': '',
    'cohort': ''
  });

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: ''});
  }

  useEffect(() => {
    api.getUserInfo()
      .then(r => setCurrentUser(r))
  }, [])

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="App">
        <div className="page">
          <Header />
          <Main onEditAvatarClick={ handleEditAvatarClick }
                onEditProfileClick={ handleEditProfileClick }
                onAddPlaceClick={ handleAddPlaceClick }
                onCardClick={ handleCardClick } 
          />
          <Footer />
          <PopupWithForm name="avatar-edit" title="Обновить аватар" isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } >
          <input type="url" name="profile-edit-avatar" className="popup__input popup__input_field_avatar" id="field_avatar" placeholder="Ссылка" required />
          <span className="popup__input-error popup__input-error_field_avatar"></span>
          </PopupWithForm>
          <PopupWithForm name="profile-edit" title="Редактировать профиль" isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } >
            <input type="text" name="profile-input-name" className="popup__input popup__input_field_name " id="field_name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error popup__input-error_field_name"></span>
            <input type="text" name="profile-input-description" className="popup__input popup__input_field_description " id="field_description" placeholder="Род деятельности" minLength="2" maxLength="200" required />
            <span className="popup__input-error popup__input-error_field_description"></span>
          </PopupWithForm>
          <PopupWithForm name="card_delete" title="Вы уверены?" buttonText="Да">
          </PopupWithForm>
          <PopupWithForm name="new-card" title="Новое место" isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } >
            <input type="text" name="card-input-name" className="popup__input popup__input_field_card " id="field_card" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__input-error popup__input-error_field_card"></span>
            <input type="url" name="card-input-link" className="popup__input popup__input_field_link " id="field_link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error popup__input-error_field_link"></span>
          </PopupWithForm>
          <ImagePopup onClose={ closeAllPopups } card={ selectedCard }/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
