// Card.js: Actualización para cerrar el popup con la "X"
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._containerElement = this._element.querySelector(
      ".elements__container"
    );
    this._imageElement = this._element.querySelector(".element__photo-link");
    this._titleElement = this._element.querySelector(".element__photo-name");
    this._likeButton = this._element.querySelector(".element__heart-button");
    this._trashButton = this._element.querySelector(".element__photo-trash");
    this._handleCardClick = handleCardClick;
    this._isEscapeListenerAdded = false;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._toggleLike());
    }

    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => this._deleteCard());
    }

    if (this._imageElement) {
      this._imageElement.addEventListener("click", () =>
        this._handleCardSizeup()
      );
    }
  }

  _toggleLike() {
    this._likeButton.classList.toggle("element__heart-button_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleCardSizeup() {
    const popupImage = document.querySelector("#popup-image");
    const popupCaption = document.querySelector("#popup-caption");
    const imagePopup = document.querySelector("#popup-size-card");

    if (popupImage && popupCaption && imagePopup) {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;

      imagePopup.classList.add("popup__show");

      const closeButton = imagePopup.querySelector("#popup-close-card");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          imagePopup.classList.remove("popup__show");
          document.removeEventListener("keydown", this._handleEscape);
          this._isEscapeListenerAdded = false;
        });
      }

      if (!this._isEscapeListenerAdded) {
        this._handleEscape = (event) => {
          if (event.key === "Escape") {
            imagePopup.classList.remove("popup__show");
          }
        };
        document.addEventListener("keydown", this._handleEscape);
        this._isEscapeListenerAdded = true;
      }
    } else {
      console.error("No se encontró el elemento de card size up.");
    }
  }
}
