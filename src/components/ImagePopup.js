import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup-image popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <button className="popup-image__close popup__close" aria-label="Закрыть" type="button" onClick={props.onClose}></button>
            <img className="popup-image__image" src={props.isOpen.image} alt={props.isOpen.title}/>
            <p className="popup-image__title">{props.isOpen.title}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
