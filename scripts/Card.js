import api from './Api.js';
import PopupWithConfirm from './popupWithConfirm.js';

export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes || [];
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__photo-link');
    this._titleElement = this._element.querySelector('.element__photo-name');
    this._likeButton = this._element.querySelector('.element__heart-button');
    this._likeCountElement = this._element.querySelector('.element__like-count');
    this._trashButton = this._element.querySelector('.element__photo-trash');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }

  // Función para manejar el click en el botón de papelera
  // Función para manejar el click en el botón de papelera
  _handleTrashClick() {
    this._handleDeleteClick(this._cardId, this._element);  // Ahora llama correctamente
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._trashButton.addEventListener('click', () => this._handleTrashClick());
    this._imageElement.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }


  _toggleLike() {
    const isLiked = this._likeButton.classList.contains('element__heart-button_active');
    api.changeLikeCardStatus(this._cardId, !isLiked)
      .then((data) => {
        this._likes = data.likes || [];
        this._likeCountElement.textContent = this._likes.length;
        this._likeButton.classList.toggle('element__heart-button_active', !isLiked);
      })
      .catch(err => console.log(err));
  }

  _confirmDelete() {
    const confirmPopup = new PopupWithConfirm({
      popupSelector: '#popup-confirm',
      handleConfirm: () => {
        api.deleteCard(this._cardId)
          .then(() => {
            this._element.remove();
            this._element = null;
            confirmPopup.close();
          })
          .catch(err => console.log(err));
      }
    });
    confirmPopup.open();
  }

  generateCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeCountElement.textContent = this._likes.length;
    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._trashButton.style.display = 'none';
    }

    if (this._likes.some(user => user._id === this._userId)) {
      this._likeButton.classList.add('element__heart-button_active');
    } else {
      this._likeButton.classList.remove('element__heart-button_active');
    }

    // La papelera aparece en todas las tarjetas
    this._trashButton.style.display = 'block';
    this._setEventListeners();

    return this._element;
  }
}
