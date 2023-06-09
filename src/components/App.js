import React, { useState } from 'react';
import '../index.css';
import { Header } from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(false);


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
    setselectedCard(false)
  };

  return (
    <>

  <div className="page">

  <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" placeholder="Имя" id="name-input" className="popup-edit__input popup-edit__input_type_title popup__input popup__input_type_title" name="name" required minLength="2" maxLength="40" />
        <span className="popup__input-error name-input-error"></span>
        <input type="text" placeholder="О себе" id="about-input" className="popup-edit__input popup-edit__input_type_about popup__input popup__input_type_about" name="about" required minLength="2" maxLength="200" />
        <span className="popup__input-error about-input-error"></span>
      </PopupWithForm>
  <PopupWithForm name="element" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" id="title-input" className="popup-element__input popup-element__input_type_title popup__input popup__input_type_title" name="name" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__input-error name-input-error"></span>
        <input id="link-input" className="popup-element__input popup-element__input_type_description popup__input popup__input_type_description" name="link" placeholder="Ссылка на картинку" required type="url" />
        <span className="popup__input-error link-input-error"></span>
  </PopupWithForm>
  <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input placeholder="Ссылка на картинку" name="link" required type="url" className="popup__input popup-avatar__input" />
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
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

    </div>
  </div>
  <template id="element">
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
  </template>
</>

  );
}

export default App;
