
const apiOptions = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "410a769a-c4fc-431d-ae52-dff1b88ee80d",
    "Content-Type": "application/json",
  }
};

class Api {
  constructor({ baseUrl, headers }) {  // Se desestructura apiOptions aquí
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Obtener datos del usuario y tarjetas iniciales
  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userData, initialCards]) => {
        return { userData, initialCards }; // Devuelve un objeto para mejor manejo en index.js
      })
      .catch(err => console.error(`Error al cargar datos iniciales: ${err}`));
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  // Obtener tarjetas iniciales desde el servidor
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(err => console.error(`Error al obtener tarjetas: ${err}`));
  }


  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  // Eliminar tarjeta del servidor
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(err => console.error(`Error al eliminar tarjeta: ${err}`));
  }


  // Actualizar el avatar del usuario en el servidor
  // Actualizar el avatar del usuario en el servidor
  setUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl })  // Asegurarse de que el JSON sea correcto
    })
      .then(this._checkResponse)
      .catch(err => console.error(`Error al actualizar avatar: ${err}`));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api(apiOptions);
export default api;
