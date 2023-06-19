import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleLikeClick() {
    props.onLikeClick(props.card);
  }

  function handleDeleteClick() {
    console.log('hi')
    props.onDeleteClick(props.card);
  }

  function handleClick() {
    props.onOpenPopupWithImage(props.card);
  }

  return (
    <div className="element" key={props.card._id}>
      {isOwn && <button className='element__delete' onClick={handleDeleteClick} type="button" aria-label="Удалить" />}
      <img
        className="element__image"
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
      />
      <div className="element__text-container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Лайк"
            type="button"
          />
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
