import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((error) => {
        console.log('Error fetching user info:', error);
      });

    api.fetchCards()
      .then((cardsData) => {
        const formattedCards = cardsData.map((card) => ({
          id: card._id,
          title: card.name,
          image: card.link,
          likes: card.likes.length,
        }));
        setCards(formattedCards);
      })
      .catch((error) => {
        console.log('Error fetching cards:', error);
      });
  }, []);

  const [cards, setCards] = useState([]);


  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__user">
            <div className="profile__avatar-container" onClick={props.onEditAvatar}>
              <img alt='Фотография профиля' className="profile__avatar" src={userAvatar} />
            </div>
            <div className="profile__info">
              <div className="profile__texts">
                <h1 className="profile__title">{userName}</h1>
                <p className="profile__about">{userDescription}</p>
              </div>
              <button className="profile__edit" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
            </div>
          </div>
          <button className="profile__button" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card key={card.id} card={card} onOpenPopupWithImage={props.onCardClick} />
      ))}
        </section>
      </main>
    </>
  );
}

export default Main;
