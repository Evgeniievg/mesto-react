import React, { useState, useEffect } from 'react';
import '../index.css';
import { Header } from './Header';
import Main from './Main';
import api from '../utils/Api';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {

  const [currentUser , setСurrentUser ] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);


  useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setСurrentUser(userInfo)
      })
      .catch((error) => {
        console.log('Error fetching user info:', error);
      });
  }, []);

  const [cards, setCards] = useState([])

  useEffect(() => {
    api.fetchCards(cards).then((data) => {
      console.log(data)
       setCards(data)
      })
      .catch((error) => {
        console.log('Error fetching cards:', error);
      });
  }, []);



  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    }).catch((error) => console.error(`Ошибка при клике на лайк : ${error}`))
}

function handleUpdateUser() {
  api.changeProfile(currentUser)
}

  function handleCardClick(card) {
    setselectedCard(card);
  }


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }


  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setselectedCard(null)
  };

  return (
    <CurrentUserContext.Provider value={ currentUser }>

      <div className="page">
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm
        name="element"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
            <input
              type="text"
              id="title-input"
              className="popup-element__input popup-element__input_type_title popup__input popup__input_type_title"
              name="name"
              placeholder="Название"
              required minLength="2"
              maxLength="30" />
            <span className="popup__input-error name-input-error"></span>
            <input
              id="link-input"
              className="popup-element__input popup-element__input_type_description popup__input popup__input_type_description"
              name="link" placeholder="Ссылка на картинку"
              required type="url" />
            <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
              <input
                placeholder="Ссылка на картинку"
                name="link"
                required type="url"
                className="popup__input popup-avatar__input" />
              <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>

      <ImagePopup onOpenPopupWithImage={handleCardClick} onClose={closeAllPopups} isOpen={selectedCard}/>

        <div className="popup popup-delete">
          <div className="popup__container">
            <button aria-label="Закрыть" type="button" className="popup__close"></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <form name="form" className="popup__form">
              <button type="submit" className="popup__button">Да</button>
            </form>
          </div>
        </div>
        <div className="page__wrapper">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <Footer />

        </div>
      </div>
      <div className="element">
        <button className="element__delete" type="button" aria-label="Удалить"></button>
        <img className="element__image" />
        <div className="element__text-container">
          <h2 className="element__title"></h2>
          <div className="element__like-container">
            <button className="element__like" aria-label="Лайк" type="button"></button>
            <p className="element__like-count"></p>
          </div>
        </div>
      </div>
    </ CurrentUserContext.Provider>

  );
}

export default App;
