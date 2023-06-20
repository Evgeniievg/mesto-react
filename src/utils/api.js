 import { token } from "./utils";
 import { link } from "./utils";

 class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  fetchCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  changeProfile({ name, about }) {
    return fetch(`${this._link}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleServerResponse);
  }

  createCard({ name, link }) {
    return fetch(`${this._link}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
    }).then(this._handleServerResponse);
  }


  deleteCard(id) {
    return fetch(`${this._link}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }


  _addLike(id) {
    return fetch(`${this._link}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  _removeLike(id) {
    return fetch(`${this._link}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  changeLikeCardStatus(id, isLiked) {

    return isLiked ? this._removeLike(id) : this._addLike(id);
  }

  changeAvatar(data) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
 }

const api = new Api({
  link: link,
  headers: {
    Authorization: token,
    'Content-Type': 'application/json',
  },
});

export default api;
