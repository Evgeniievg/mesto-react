import React from 'react';

function Card(props) {
  function handleClick() {
    props.onOpenPopupWithImage(props.card);
  }

  return (
    <div className="element" key={props.card.id}>
      <button className="element__delete" type="button" aria-label="Удалить"></button>
      <img className="element__image" onClick={handleClick} src={props.card.image} alt={props.card.title} />
      <div className="element__text-container">
        <h2 className="element__title">{props.card.title}</h2>
        <div className="element__like-container">
          <button className="element__like" aria-label="Лайк" type="button" />
          <p className="element__like-count">{props.card.likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
