import React, { useState, useEffect } from 'react';
import '../index.css';
import { Header } from './Header';
import Main from './Main';
import api from '../utils/Api';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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
       setCards(data)
      })
      .catch((error) => {
        console.log('Ошибка при загрузке карточек:', error);
      });
  }, []);



  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    }).catch((error) => console.error(`Ошибка при клике на лайк : ${error}`))
}

function handleCardDelete(card){
  api.deleteCard(card._id).then(() => {
    setCards((item) => item.filter((c) => c._id !== card._id))
  }).catch(error => {
    console.log('Ошибка при удалении карточки:', error);
  });
}

function handleUpdateUser({name, about}) {
  api.changeProfile({name, about})
    .then(newInfo => {
      setСurrentUser(newInfo);
      closeAllPopups();
    })
    .catch(error => {
      console.log('Ошибка при обновлении данных пользователя:', error);
    });
}


  function handleUpdateAvatar(avatar){
    api.changeAvatar(avatar)
    .then(data => {
      setСurrentUser(data);
      closeAllPopups();
    })
    .catch(error => {
      console.log('Ошибка при обновлении аватара:', error);
    });
  }

  function handleAddPlaceSubmit({name, link}){
    console.log({name, link})
    api.createCard({name, link}).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(error => {
      console.log('Ошибка при добавлении карточки:', error);
    });
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

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

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
            onCardDelete={handleCardDelete}
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
