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
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [ cards, setCards ] = React.useState([]);
  const [ selectedCard, setSelectedCard] = React.useState({ name: '', link: ''});
  
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  
  const [ currentUser, setCurrentUser ] = React.useState({
    'name': '',
    'avatar': '',
    'about': '',
    '_id': '',
    'cohort': ''
  });

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
      setCards(() => cards.filter(c => c._id !== card._id))
    })
    .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = (card) => {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    api.getInitialCards()
      .then((places) => {
        setCards(places)
      })
      .catch(err => console.log(err))
  }, [])
  

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
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (avatar) => {
    api.setAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err))
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
                cards={ cards }
                onCardLike={ handleCardLike }
                onCardDelete={ handleCardDelete }
          />
          <Footer />
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar={ handleUpdateAvatar } />
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser } />
          <PopupWithForm name="card_delete" title="Вы уверены?" buttonText="Да">
          </PopupWithForm >

          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups }  onAddplaceSubmit={ handleAddPlaceSubmit }/>

          <ImagePopup onClose={ closeAllPopups } card={ selectedCard }/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
