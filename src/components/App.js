import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';


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

  const handleUpdateUser = (newUserInfo) => {
    api.setUserInfo(newUserInfo)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
  }

  const handleUpdateAvatar = (avatar) => {
    api.setAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
  }

  useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
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

          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar={ handleUpdateAvatar } />
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser } />

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
